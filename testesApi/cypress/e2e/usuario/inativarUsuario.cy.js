describe ("Inativar Usuários", () => {
    let usuario;
    let filme;

    beforeEach(function () {
        cy.criarUsuario().then((novoUsuario) => {
            usuario = novoUsuario;
        })
    })

    afterEach(() => {
        cy.deletarUsuario(usuario);
    })

    it ("Um usuário comum deve conseguir desativar sua conta", () => {
        cy.login(usuario).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.inativarConta(token).then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.equal("");
            })
        })
    })

    it ("Um administrador deve conseguir desativar sua conta", () => {
        cy.login(usuario).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.criarUsuarioAdmin(token).then(function () {
                cy.inativarConta(token).then((response) => {
                    expect(response.status).to.equal(204);
                    expect(response.body).to.equal("");
                })
            });
        })
    })

    it ("Um crítico deve conseguir desativar sua conta", () => {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.criarUsuarioCrititco(token).then(function () {
                cy.inativarConta(token).then((response) => {
                    expect(response.status).to.equal(204);
                    expect(response.body).to.equal("");
                })
            });
        });
    })
//rever
    it ("As informações de review de filme devem continuar mesmo com a inativação", () => {
        cy.login(usuarioCriado).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.criarUsuarioAdmin(token).then(function () {
                cy.CadastrarFilme({
                    title: " ",
                    genre: " ",
                    description: " ",
                    durationInMinutes: 105,
                    releaseYear: 2017
                }, token).then((filme) => {
                    filme = movie.body
                }).then(function () {
                    cy.criarReview(filme.id, 5, "Amei! Superou minhas expectativas", token).then(function () {
                        cy.inativarConta(token);

                        cy.buscaFilmeId(filme.id).then((response) => {
                            expect(response.status).to.equal(200);
                            expect(response.body.reviews).to.be.an("array");
                            expect(response.body.reviews[0].user.id).to.equal(usuario.id);
                            expect(response.body.reviews[0].user.name).to.equal(usuario.name);
                        })
                    })
                })
            })
        })  
    })

    it ("Não deve ser possível inativar uma conta sem estar logado", () => {
        cy.request({
            method: 'PATCH',
            url: "/users/inactivate",
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    })
    
    it ("Deve ser possivel cadastrar usuario usando um e-mail de uma conta inativa", () => {
        
        let name = faker.person.fullName();
        let password = "123456";

        cy.login(usuario).then((login) => {
            token = login.body.accessToken
        }).then(function () {
            cy.inativarConta(token).then(() => {
                cy.request({
                    method: "POST",
                    url: "/api/users/",
                    body: {
                        name: name,
                        email: usuario.email,
                        password: password,
                    }
                }).then((response) => {
                    expect(response.status).to.equal(201);
                    expect(response.body.email).to.deep.equal(usuarioCriado.email);
                })
            });
        });
    })
})