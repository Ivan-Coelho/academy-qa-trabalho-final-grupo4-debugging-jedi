

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

        it('Não deve ser possível fazer uma avaliação informando uma nota maior que 5', function(){
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

        it('Não deve ser possível fazer uma avaliação informando uma nota menor que 1', function(){
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

        it('Não deve ser possível fazer uma avaliação informando uma nota negativa', function(){
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

        it('Não deve ser possível fazer uma avaliação informando uma nota não inteira', function(){
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

        // it('Não deve ser possível usuário avaliar o mesmo filme duas vezes', function(){});




    });

    // describe('Avaliações de filme de maneira válida', function(){

    //     it('Deve ser possível um usuário logado fazer uma avaliação de filme', function(){});

    //     it('Deve ser possível um usuário fazer uma avaliação sem informar um comentário', function(){});

    //     it('Deve ser possível um usuário fazer uma atualização da avaliação de um filme já avaliado anteriormente', function(){});

    //     it('Deve ser possível um usuário fazer uma avaliação com comentário de 500 caractees', function(){});

    //     it('Deve ser possível um usuário fazer uma avaliação com uma nota de uma estrela', function(){});

    //     it('Deve ser possível um usuário fazer uma avaliação com uma nota de cinco estrela', function(){});

    //     it('Avaliação de filme por um usuário crítico deve impactar a nota critica', function(){});




    // });
});