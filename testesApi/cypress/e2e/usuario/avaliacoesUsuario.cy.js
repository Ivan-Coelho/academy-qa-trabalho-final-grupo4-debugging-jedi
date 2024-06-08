

describe('Avaliação de filme', function () {

    describe('Avaliações de filme de maneira invalida', function () {

        let userAdmin
        let idFilme
        before(function () {
            cy.criarUsuarioAdmin().then(function (dadosAdmin) {
                userAdmin = dadosAdmin
            });
        });

        beforeEach(function () {
            cy.fixture('filmes/bodyReview.json').as('filme')
            cy.cadastrarFilme(userAdmin.token).then(function (response) {
                idFilme = response
                this.filme.id = idFilme
            })

        });

        afterEach(function () {
            cy.deletarFilme(idFilme, userAdmin.token)
        });

        after(function () {
            cy.deletarUsuario(userAdmin.id, userAdmin.token)
        });

        it('Não deve ser possível usuários não cadastrados/logado avaliar um filme', function () {

            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 5,
                    reviewText: 'Melhor filme do mundo'
                }, failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(401)
                expect(response.body.message).to.equal("Access denied.")
            });
        });

        it('Não deve ser possível fazer uma avaliação sem informar uma nota', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    reviewText: 'Melhor filme do mundo'
                }, headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.deep.equal(
                    ["score must be a number conforming to the specified constraints", "score should not be empty"]
                )
            });

        });

        it('Não deve ser possível fazer uma avaliação informando um id de filme invalido', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: 'a',
                    score: 5,
                    reviewText: 'Melhor filme do mundo'
                }, headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.deep.equal(
                    ['movieId must be an integer number']
                )
            });

        });

        it('Não deve ser possível fazer uma avaliação informando um id de filme não cadastrado', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: 999999,
                    score: 5,
                    reviewText: 'Melhor filme do mundo'
                }, headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(404)
                expect(response.body.message).to.equal("Movie not found")
            });
        });

        it('Não deve ser possível fazer uma avaliação com um comentario maior que 500 caracteres', function () {

            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 5,
                    reviewText: 'Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. BOOM'
                }, headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body).to.deep.equal({
                    message: [
                        "reviewText must be shorter than or equal to 500 characters"
                    ],
                    error: "Bad Request",
                    statusCode: 400
                });
            });

        });

        it('Não deve ser possível fazer uma avaliação informando uma nota maior que 5', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 6,
                    reviewText: "Filme ruim de mais"
                },
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body).to.deep.equal({
                    message: "Score should be between 1 and 5",
                    error: "Bad Request",
                    statusCode: 400
                })
            })

        });

        it('Não deve ser possível fazer uma avaliação informando uma nota menor que 1', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 0,
                    reviewText: "Filme ruim de mais"
                },
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body).to.deep.equal({
                    message: "Score should be between 1 and 5",
                    error: "Bad Request",
                    statusCode: 400
                })
            })

        });

        it('Não deve ser possível fazer uma avaliação informando uma nota negativa', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: -3,
                    reviewText: "Filme ruim de mais"
                },
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)
                expect(response.body).to.deep.equal({
                    message: "Score should be between 1 and 5",
                    error: "Bad Request",
                    statusCode: 400
                })
            })
        });

        it('Não deve ser possível fazer uma avaliação informando uma nota não inteira', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 4.01,
                    reviewText: "Filme ruim de mais"
                },
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400)

            })

        });
        // não precisa desse teste
        it('Não deve ser possível usuário avaliar o mesmo filme duas vezes', function () {
            cy.criarReview(idFilme, userAdmin.token);
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 4.0,
                    reviewText: "Gostei do filme"
                },
                headers: { Authorization: 'Bearer ' + userAdmin.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });

            cy.request({
                method: 'GET',
                url: '/movies/' + idFilme
            }).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.body.reviews).to.be.an('array').to.have.lengthOf(1)
            })


        });




    });

    describe.only('Avaliações de filme de maneira válida', function () {

        let userAdmin, userComum
        let idFilme
        before(function () {
            cy.criarUsuarioAdmin().then(function (dadosAdmin) {
                userAdmin = dadosAdmin
            });

            cy.usuarioLogado().then(function (dadosComum) {
                userComum = dadosComum
            })
        });

        beforeEach(function () {
            cy.fixture('filmes/bodyReview.json').as('filme')
            cy.cadastrarFilme(userAdmin.token).then(function (response) {
                idFilme = response
                this.filme.id = idFilme
            });
        });

        afterEach(function () {
            cy.deletarFilme(idFilme, userAdmin.token)
        });

        after(function () {
            cy.deletarUsuario(userComum.id, userAdmin.token)
            cy.deletarUsuario(userAdmin.id, userAdmin.token)

        });

        it('Deve ser possível um usuário logado fazer uma avaliação de filme', function () {

            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 4.0,
                    reviewText: "Gostei do filme"
                },
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });
            //validando a review
            cy.fixture('filmes/bodyReview2.json').as('review')
            cy.request({
                method: 'GET',
                url: 'users/review/all',
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                this.review[0].id = response.body[0].id
                this.review[0].movieId = idFilme
                expect(response.status).to.equal(200)
                expect(response.body).to.deep.equal(this.review)
            })
        });
        // Isso é um BUG??
        it('Deve ser possível um usuário fazer uma avaliação sem informar um comentário', function () {

            cy.fixture('filmes/bodyReview2.json').as('review')

            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 4.0,
                },
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });

            cy.request('GET', 'users/review/all'). then(function (response) {
                expect(response.status).to.equal(200)
                expect(response.body).to.deep.equal(this.review)
            })

        });

        it('Deve ser possível atualizar a avaliação de um filme e não deve existir duas avaliações do mesmo usuario', function () {
                       
            cy.criarReview(idFilme, userComum.token)

            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 4.0,
                    reviewText: "Gostei do filme"
                },
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });

            cy.buscaFilmeId(idFilme).then(function (response) {
                expect(response.reviews).to.be.an('array').to.have.lengthOf(1)                

                expect(response.id).to.equal(idFilme)

                expect(response.reviews[0].reviewText).to.equal("Gostei do filme")
                expect(response.reviews[0].id).to.be.an('number')
                expect(response.reviews[0].reviewType).to.equal(0)
                expect(response.reviews[0].score).to.equal(4)
                expect(response.reviews[0].updatedAt).to.be.an('string')

                expect(response.reviews[0].user.id).to.equal(userComum.id)
                expect(response.reviews[0].user.name).to.equal(userComum.nome)
                expect(response.reviews[0].user.type).to.equal(0)
            })
        });

        it('Deve ser possível um usuário fazer uma avaliação com comentário de 500 caractees', function () {

            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 4.0,
                    reviewText: 'Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. Bom'
                },
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });

            cy.fixture('filmes/bodyReview2.json').as('review')
            cy.request({
                method: 'GET',
                url: 'users/review/all',
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                this.review[0].reviewText = 'Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. Bom'
                this.review[0].id = response.body[0].id
                this.review[0].movieId = idFilme

                expect(response.status).to.equal(200)
                expect(response.body).to.deep.equal(this.review)
            })
        });

        it('Deve ser possível um usuário fazer uma avaliação com uma nota de uma estrela', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 1,
                    reviewText: 'Gostei do filme'
                },
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });

            cy.fixture('filmes/bodyReview2.json').as('review')
            cy.request({
                method: 'GET',
                url: 'users/review/all',
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                this.review[0].score = 1
                this.review[0].id = response.body[0].id
                this.review[0].movieId = idFilme

                expect(response.status).to.equal(200)
                expect(response.body).to.deep.equal(this.review)
            })

        });

        it('Deve ser possível um usuário fazer uma avaliação com uma nota de cinco estrela', function () {
            cy.request({
                method: 'POST',
                url: 'users/review',
                body: {
                    movieId: idFilme,
                    score: 5,
                    reviewText: 'Gostei do filme'
                },
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                expect(response.status).to.equal(201)
            });

            cy.fixture('filmes/bodyReview2.json').as('review')
            cy.request({
                method: 'GET',
                url: 'users/review/all',
                headers: { Authorization: 'Bearer ' + userComum.token }
            }).then(function (response) {
                this.review[0].score = 5
                this.review[0].id = response.body[0].id
                this.review[0].movieId = idFilme

                expect(response.status).to.equal(200)
                expect(response.body).to.deep.equal(this.review)
            })
        });

        it('Avaliação de filme por um usuário crítico deve impactar a nota critica', function () {

            cy.criarUsuarioCritico().then(function (dadosCritico) {
                let userCritico = dadosCritico

                cy.request({
                    method: 'POST',
                    url: 'users/review',
                    body: {
                        movieId: idFilme,
                        score: 5,
                        reviewText: 'Gostei do filme'
                    },
                    headers: { Authorization: 'Bearer ' + userCritico.token }
                }).then(function (response) {
                    expect(response.status).to.equal(201)
                });
            });
            cy.buscaFilmeId(idFilme).then(function (response) {
                expect(response.criticScore).to.equal(5)
                expect(response.audienceScore).to.equal(0)
            })
        });


    });
});
