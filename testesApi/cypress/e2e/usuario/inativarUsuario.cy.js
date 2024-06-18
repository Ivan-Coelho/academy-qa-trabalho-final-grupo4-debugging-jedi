describe("Inativar Usuários", () => {
    let usuario;
    let idFilme;
    let userAdmin;
    let nameFilm;

    before(function () {
        cy.criarUsuarioAdmin().then(function (dadosAdmin) {
            userAdmin = dadosAdmin
            userAdmin.accessToken = dadosAdmin.tokenAdmin

        })
    });

    beforeEach(() => {
        cy.cadastrarFilme(userAdmin.token).then(function (response) {
            nameFilm = response.body.name
            idFilme = response.body.id
        });

        cy.criarUsuarioResponse().then((novo) => {
            usuario = novo
            cy.login(usuario).then((conteudo) => {
                usuario.accessToken = conteudo.body.accessToken
            })
        });
    });




    it("Um usuário comum deve conseguir desativar sua conta", () => {
        cy.inativarConta(usuario.accessToken).then((response) => {
            expect(response.status).to.equal(204);
            expect(response.body).to.equal("");
        })
    })

    it("Um administrador deve conseguir desativar uma conta", () => {
        cy.inativarConta(usuario.accessToken).then((response) => {
            expect(response.status).to.equal(204);
            expect(response.body).to.equal("");
        })
    })


    it("Um crítico deve conseguir desativar sua conta", () => {
        cy.criarUsuarioCritico(usuario.accessToken).then(function () {
            cy.inativarConta(usuario.accessToken).then((response) => {
                expect(response.status).to.equal(204);
                expect(response.body).to.equal("");
            })
        });
    });

    

    it("Não deve ser possível inativar uma conta sem estar logado", () => {
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

    
});


describe('Cenário com Reviews', function () {
    let userAdmin
    let idFilme
    before(function () {
        cy.criarUsuarioAdmin().then(function (dadosAdmin) {
            userAdmin = dadosAdmin
            cy.cadastrarFilme(userAdmin.token).then(function (response) {
                idFilme = response.body.id
            });
        });
    });


    after(function () {
        cy.deletarFilme(idFilme, userAdmin.token);
        cy.deletarUsuario(userAdmin.id, userAdmin.token);
    });



    it('Deve ser possível visualizar a review de um  usuário com conta inativada', function () {
        let comentario
        let nota
        cy.usuarioLogado().then(function (dadosComum) {
            let userComum = dadosComum
            cy.criarReview(idFilme, userComum.token).then(function (response) {
                comentario = response.comentario
                nota = response.score

                cy.request({
                    method: "PATCH",
                    url: "users/inactivate",
                    headers: { Authorization: "Bearer " + userComum.token }
                });

                cy.buscaFilmeId(idFilme).then(function (response) {

                    expect(response.id).to.equal(idFilme);
                    expect(response.reviews[0].reviewText).to.equal(comentario);
                    expect(response.reviews[0].reviewType).to.equal(0);
                    expect(response.reviews[0].score).to.equal(nota);

                    expect(response.reviews[0].user.id).to.equal(userComum.id);
                    expect(response.reviews[0].user.name).to.equal(userComum.nome);
                    expect(response.reviews[0].user.type).to.equal(0);
                });
            });
        });
    });

    it('Uma vez inativado, o e-mail vinculado ao usuário se torna disponível', function () {
        let userComum
        cy.usuarioLogado().then(function (dadosComum) {
            userComum = dadosComum
            let email = dadosComum.email.toLowerCase()


            cy.request({
                method: "PATCH",
                url: "users/inactivate",
                headers: { Authorization: "Bearer " + userComum.token }
            });

            cy.request({
                method: 'POST',
                url: '/users',
                body: {
                    name: 'Fatima Leite',
                    email: userComum.email,
                    password: '123456'
                },
            }).then(function (response) {
                expect(response.status).to.equal(201);
                expect(response.body.email).to.equal(email)
            });

        });
    });
});


