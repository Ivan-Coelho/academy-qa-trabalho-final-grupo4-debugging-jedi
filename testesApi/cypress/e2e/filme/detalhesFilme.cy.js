import { faker } from "@faker-js/faker"

describe('Consulta de detalhes de filmes', function () {

    describe('Busca de filmes pelo ID', function () {
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

        it('Não deve ser possivel buscar um filme informando um id invalido', function () {

            cy.request({
                method: 'GET',
                url: '/movies/' + 0.5,
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal("Validation failed (numeric string is expected)")
                expect(response.body.error).to.equal("Bad Request")
            });
        });

        it('Não deve ser possivel buscar um filme informando um id do tipo string', function () {

            cy.request({
                method: 'GET',
                url: '/movies/' + 'a',
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal("Validation failed (numeric string is expected)")
                expect(response.body.error).to.equal("Bad Request")
            });
        });

        it('Não deve ser possivel buscar um filme informando um caracter especial como id', function () {

            cy.request({
                method: 'GET',
                url: '/movies/' + '§',
                headers: { Authorization: 'Bearer ' + userAdmin.token },
                failOnStatusCode: false
            }).then(function (response) {
                expect(response.status).to.equal(400);
                expect(response.body.message).to.equal("Validation failed (numeric string is expected)")
                expect(response.body.error).to.equal("Bad Request")
            });
        });


        it('Deve ser possível usuario não cadastrado localizar um filme pelo ID', function () {

            cy.request({
                method: 'GET',
                url: '/movies/' + idFilme
            }).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal(this.filme)
            })
        });

        it('Deve ser possível a um usuario cadastrado e logado localizar um filme pelo ID', function () {

            cy.request({
                method: 'GET',
                url: '/movies/' + idFilme,
                headers: { Authorization: 'Bearer ' + userAdmin.token }
            }).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.body).to.deep.equal(this.filme)
            })
        });

        it('Buscar um filme por id utilizando um id inexistente deve retornar vazio', function () {
            // faz sentido esse teste?
            cy.request({
                method: 'GET',
                url: '/movies/' + 99758
            }).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.body).to.equal('').that.is.empty
            })
        });
        //Analisar esse teste
        it('Ao buscar um filme por id com review de usuário do tipo administrador deve retornar a avaliação e os dados do usuário', function () {

            cy.criarReview(idFilme, userAdmin.token).then(function (response) {
                let comentario = response.comentario
                //let nota = response.score


                cy.request({ // como fazer esse teste ?????? deixou de fazer sentido
                    method: 'GET',
                    url: '/movies/' + idFilme
                }).then(function (response) {
                    expect(response.status).to.equal(200);
                    expect(response.body.id).to.equal(idFilme)

                    expect(response.body.reviews).to.be.an('array')
                    expect(response.body.reviews[0].reviewText).to.equal(comentario)
                    expect(response.body.reviews[0].id).to.be.an('number')
                    //expect(response.body.reviews[0].reviewType).to.equal(0)  O QUE FAZER AQUI? Deveria quebrar nesse ponto
                    //expect(response.body.reviews[0].score).to.equal(nota)
                    expect(response.body.reviews[0].updatedAt).to.be.an('string')

                    expect(response.body.reviews[0].user.id).to.equal(userAdmin.id)
                    expect(response.body.reviews[0].user.name).to.equal(userAdmin.nome)
                    expect(response.body.reviews[0].user.type).to.equal(1)
                    //expect(response.body.adminScore).to.equal(nota)
                })

            })
        })

        it('Ao buscar um filme por id com review de usuário do tipo crítico deve retornar a avaliação e os dados do usuário', function () {
            let userCritico

            cy.criarUsuarioCritico().then(function (dadosCritico) {
                userCritico = dadosCritico

                cy.criarReview(idFilme, userCritico.token).then(function (response) {
                    let comentario = response.comentario
                    let nota = response.score
                    cy.log(nota)

                    cy.request({
                        method: 'GET',
                        url: '/movies/' + idFilme
                    }).then(function (response) {
                        expect(response.status).to.equal(200);
                        expect(response.body.id).to.equal(idFilme)
                        expect(response.body.criticScore).to.equal(nota)

                        expect(response.body.reviews).to.be.an('array')
                        expect(response.body.reviews[0].reviewText).to.equal(comentario)
                        expect(response.body.reviews[0].id).to.be.an('number')
                        expect(response.body.reviews[0].reviewType).to.equal(1)
                        expect(response.body.reviews[0].score).to.equal(nota)
                        expect(response.body.reviews[0].updatedAt).to.be.an('string')

                        expect(response.body.reviews[0].user.id).to.equal(userCritico.id)
                        expect(response.body.reviews[0].user.name).to.equal(userCritico.nome)
                        expect(response.body.reviews[0].user.type).to.equal(2)
                    })
                });
                cy.deletarUsuario(userCritico.id, userAdmin.token);
            });
        })

        it('Ao buscar um filme por id com review de usuário do tipo comum deve retornar a avaliação e os dados do usuário', function () {
            let userComum

            cy.usuarioLogado().then(function (dadosComum) {
                userComum = dadosComum

                cy.criarReview(idFilme, userComum.token).then(function (response) {
                    let nota = response.score
                    let comentario = response.comentario


                    cy.request({
                        method: 'GET',
                        url: '/movies/' + idFilme
                    }).then(function (response) {
                        expect(response.status).to.equal(200);
                        expect(response.body.id).to.equal(idFilme)
                        expect(response.body.audienceScore).to.equal(nota)

                        expect(response.body.reviews).to.be.an('array')
                        expect(response.body.reviews[0].reviewText).to.equal(comentario)
                        expect(response.body.reviews[0].id).to.be.an('number')
                        expect(response.body.reviews[0].reviewType).to.equal(0)
                        expect(response.body.reviews[0].score).to.equal(nota)
                        expect(response.body.reviews[0].updatedAt).to.be.an('string')

                        expect(response.body.reviews[0].user.id).to.equal(userComum.id)
                        expect(response.body.reviews[0].user.name).to.equal(userComum.nome)
                        expect(response.body.reviews[0].user.type).to.equal(0)
                    });

                });
                cy.deletarUsuario(userComum.id, userAdmin.token);
            });
        })
        // posso validar só o array? acho que não precisa desse teste
        it('Ao buscar um filme por id todas as avaliações devem ser listadas', function () {

            //let userComum = []

            for (let i = 0; i < 5; i++) {
                cy.usuarioLogado().then(function (dadosComum) {
                    //userComum.push(dadosComum.token)
                    //cy.criarReview(idFilme, userComum[i])
                    cy.criarReview(idFilme, dadosComum.token)
                    cy.inativarConta(dadosComum.token)
                })
            }

            cy.request({
                method: 'GET',
                url: '/movies/' + idFilme
            }).then(function (response) {
                expect(response.status).to.equal(200);
                expect(response.body.id).to.equal(idFilme)
                expect(response.body.reviews).to.be.an('array').to.have.lengthOf(5)

            })
        });

        it('Ao buscar um filme por id com 2 reviews de usuário do tipo crítico deve retornar as avaliações e os dados dos usuários', function () {
            let userCritico1
            let userCritico2

            cy.criarUsuarioCritico().then(function (dadosCritico1) {
                userCritico1 = dadosCritico1

                cy.criarReview(idFilme, userCritico1.token).then(function (response) {
                    let comentario1 = response.comentario
                    let nota1 = response.score

                    cy.criarUsuarioCritico().then(function (dadosCritico2) {
                        userCritico2 = dadosCritico2

                        cy.criarReview(idFilme, userCritico2.token).then(function (response) {
                            let comentario2 = response.comentario
                            let nota2 = response.score

                            let media = (nota1 + nota2) / 2

                            cy.request({
                                method: 'GET',
                                url: '/movies/' + idFilme
                            }).then(function (response) {
                                expect(response.status).to.equal(200);
                                expect(response.body.id).to.equal(idFilme)
                                expect(response.body.criticScore).to.equal(media)
                                expect(response.body.audienceScore).to.equal(0)

                                expect(response.body.reviews).to.be.an('array')
                                expect(response.body.reviews[0].reviewText).to.equal(comentario1)
                                expect(response.body.reviews[0].id).to.be.an('number')
                                expect(response.body.reviews[0].reviewType).to.equal(1)
                                expect(response.body.reviews[0].score).to.equal(nota1)
                                expect(response.body.reviews[0].updatedAt).to.be.an('string')

                                expect(response.body.reviews[0].user.id).to.equal(userCritico1.id)
                                expect(response.body.reviews[0].user.name).to.equal(userCritico1.nome)
                                expect(response.body.reviews[0].user.type).to.equal(2)

                                expect(response.body.reviews[1].reviewText).to.equal(comentario2)
                                expect(response.body.reviews[1].id).to.be.an('number')
                                expect(response.body.reviews[1].reviewType).to.equal(1)
                                expect(response.body.reviews[1].score).to.equal(nota2)
                                expect(response.body.reviews[1].updatedAt).to.be.an('string')

                                expect(response.body.reviews[1].user.id).to.equal(userCritico2.id)
                                expect(response.body.reviews[1].user.name).to.equal(userCritico2.nome)
                                expect(response.body.reviews[1].user.type).to.equal(2)
                            });
                            cy.deletarUsuario(userCritico1.id, userAdmin.token);
                            cy.deletarUsuario(userCritico2.id, userAdmin.token);
                        });
                    });
                });
            })
        })

        it('Ao buscar um filme por id com 2 reviews de usuário do tipo comum deve retornar as avaliações e os dados dos usuários', function () {
            let userComum1, userComum2

            cy.usuarioLogado().then(function (dadosComum1) {
                userComum1 = dadosComum1

                cy.usuarioLogado().then(function (dadosComum2) {
                    userComum2 = dadosComum2

                    cy.criarReview(idFilme, userComum1.token).then(function (response) {
                        let nota1 = response.score
                        let comentario1 = response.comentario


                        cy.criarReview(idFilme, userComum2.token).then(function (response) {
                            let nota2 = response.score
                            let comentario2 = response.comentario


                            let media = (nota1 + nota2) / 2

                            cy.request({
                                method: 'GET',
                                url: '/movies/' + idFilme
                            }).then(function (response) {
                                expect(response.status).to.equal(200);
                                expect(response.body.id).to.equal(idFilme)
                                expect(response.body.criticScore).to.equal(0)
                                expect(response.body.audienceScore).to.equal(media)

                                expect(response.body.reviews).to.be.an('array')
                                expect(response.body.reviews[0].reviewText).to.equal(comentario1)
                                expect(response.body.reviews[0].id).to.be.an('number')
                                expect(response.body.reviews[0].reviewType).to.equal(0)
                                expect(response.body.reviews[0].score).to.equal(nota1)
                                expect(response.body.reviews[0].updatedAt).to.be.an('string')

                                expect(response.body.reviews[0].user.id).to.equal(userComum1.id)
                                expect(response.body.reviews[0].user.name).to.equal(userComum1.nome)
                                expect(response.body.reviews[0].user.type).to.equal(0)

                                expect(response.body.reviews[1].reviewText).to.equal(comentario2)
                                expect(response.body.reviews[1].id).to.be.an('number')
                                expect(response.body.reviews[1].reviewType).to.equal(0)
                                expect(response.body.reviews[1].score).to.equal(nota2)
                                expect(response.body.reviews[1].updatedAt).to.be.an('string')

                                expect(response.body.reviews[1].user.id).to.equal(userComum2.id)
                                expect(response.body.reviews[1].user.name).to.equal(userComum2.nome)
                                expect(response.body.reviews[1].user.type).to.equal(0)


                            });
                            cy.deletarUsuario(userComum1.id, userAdmin.token);
                            cy.deletarUsuario(userComum2.id, userAdmin.token);
                        });
                    });
                });
            });
        })

        it('Ao buscar um filme por id com 2 reviews de usuário do tipo crítico e comum deve retornar as avaliações e os dados dos usuários', function () {
            let userCritico, userComum


            cy.criarUsuarioCritico().then(function (dadosCritico) {
                userCritico = dadosCritico

                cy.criarReview(idFilme, userCritico.token).then(function (response) {
                    let comentarioCr = response.comentario
                    let notaCr = response.score

                    cy.usuarioLogado().then(function (dadosComum) {
                        userComum = dadosComum

                        cy.criarReview(idFilme, userComum.token).then(function (response) {
                            let comentarioCo = response.comentario
                            let notaCo = response.score

                            cy.request({
                                method: 'GET',
                                url: '/movies/' + idFilme
                            }).then(function (response) {
                                expect(response.status).to.equal(200);
                                expect(response.body.id).to.equal(idFilme)

                                expect(response.body.criticScore).to.equal(notaCr)
                                expect(response.body.audienceScore).to.equal(notaCo)

                                expect(response.body.reviews[0].reviewText).to.equal(comentarioCr)
                                expect(response.body.reviews[0].id).to.be.an('number')
                                expect(response.body.reviews[0].reviewType).to.equal(1)
                                expect(response.body.reviews[0].score).to.equal(notaCr)
                                expect(response.body.reviews[0].updatedAt).to.be.an('string')

                                expect(response.body.reviews[0].user.id).to.equal(userCritico.id)
                                expect(response.body.reviews[0].user.name).to.equal(userCritico.nome)
                                expect(response.body.reviews[0].user.type).to.equal(2)

                                expect(response.body.reviews[1].reviewText).to.equal(comentarioCo)
                                expect(response.body.reviews[1].id).to.be.an('number')
                                expect(response.body.reviews[1].reviewType).to.equal(0)
                                expect(response.body.reviews[1].score).to.equal(notaCo)
                                expect(response.body.reviews[1].updatedAt).to.be.an('string')

                                expect(response.body.reviews[1].user.id).to.equal(userComum.id)
                                expect(response.body.reviews[1].user.name).to.equal(userComum.nome)
                                expect(response.body.reviews[1].user.type).to.equal(0)

                            });
                            cy.deletarUsuario(userCritico.id, userAdmin.token);
                            cy.deletarUsuario(userComum.id, userAdmin.token);

                        })
                    })
                })
            });
        })

        it('A nota de audiência deve ser a média das notas de avaliações dos usuários do tipo comum', function () {
            let userComum = []
            let nota = []

            let sNota = 0
            for (let i = 0; i < 5; i++) {

                cy.usuarioLogado().then(function (dadosComum) {
                    userComum.push(dadosComum.token)

                    cy.criarReview(idFilme, userComum[i]).then(function (response) {
                        nota.push(parseInt(response.score))
                        sNota = sNota + nota[i]
                        cy.wrap(sNota).as('somaNota')

                        cy.inativarConta(dadosComum.token)
                    })
                })
            }

            cy.get('@somaNota').then(function (sNotas) {
                let media = sNotas / 5

                cy.request({
                    method: 'GET',
                    url: '/movies/' + idFilme
                }).then(function (response) {

                    expect(response.status).to.equal(200);
                    expect(response.body.id).to.equal(idFilme)
                    expect(response.body.reviews).to.be.an('array').to.have.lengthOf(5)
                    expect(response.body.audienceScore).to.equal(media)
                })
            })
        })

        it('A nota crítica deve ser a média das notas de avaliações dos usuários do tipo crítico', function () {
            let userCritico = []
            let nota = []

            let sNota = 0
            for (let i = 0; i < 5; i++) {

                cy.criarUsuarioCritico().then(function (dadoCritico) {
                    userCritico.push(dadoCritico.token)

                    cy.criarReview(idFilme, userCritico[i]).then(function (response) {
                        nota.push(parseInt(response.score))
                        sNota = sNota + nota[i]
                        cy.wrap(sNota).as('somaNota')

                        cy.inativarConta(dadoCritico.token)
                    });
                });
            }

            cy.get('@somaNota').then(function (sNotas) {
                let media = sNotas / 5

                cy.request({
                    method: 'GET',
                    url: '/movies/' + idFilme
                }).then(function (response) {

                    expect(response.status).to.equal(200);
                    expect(response.body.id).to.equal(idFilme)
                    expect(response.body.reviews).to.be.an('array').to.have.lengthOf(5)
                    expect(response.body.criticScore).to.equal(media)
                });
            });
        });
        // novo teste 

    });
});