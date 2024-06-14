describe ("Excluir Usuarios", () => {
    let token;
    let filme;
    let usuario;
    let usuarioExcluido;

    beforeEach(() => {
        cy.criarUsuario().then((novoUsuario) => {
            usuario = novoUsuario;
        });
    });

    it("Um administrador deve poder excluir um usuário", () => {
        cy.criarUsuarioAdmin().then(function (dadosAdmin) {
            let tokenAdmin = dadosAdmin.token;
            cy.deletarUsuario(usuario.id, tokenAdmin);
          });   
    });
        
    it("Um administrador deve poder excluir sua própria conta", () => {
        cy.criarUsuarioAdmin().then((dadosAdmin) => {
            const userAdmin = dadosAdmin;
            const tokenAdmin = dadosAdmin.token;
                cy.deletarUsuario(userAdmin.id, tokenAdmin).then((response) => {
                expect(response.status).to.equal(204);
            });
        });
    });
    

    it ("Um usuário comum não deve poder excluir uma conta", () => {
            cy.request({
                method: "DELETE",
                url: "/users/" + usuario.id,
                headers: { Authorization: "Bearer " + usuario.tokenComum },
                failOnStatusCode: false,
            }).then((response) =>{
                expect(response.status).to.equal(403);
                expect(response.body.error).to.be.eq('Forbidden');
            })
        })

    it ("Um usuário crítico não deve poder excluir uma conta", () => {
        cy.criarUsuarioCritico().then((dadosCritico) =>{
            let token = dadosCritico.tokenCritico
        cy.request({
            method: "DELETE",
            url: "/users/" + usuario.id,
            headers: { Authorization: "Bearer " + token },
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.equal(403);
            expect(response.body.error).to.be.eq('Forbidden');
        })
        })
    });

    it ("Um usuário crítico não deve poder excluir sua própria conta", () => {
        cy.criarUsuarioCritico().then((dadosCritico) =>{
            let token = dadosCritico.tokenCritico
        cy.request({
            method: "DELETE",
            url: "/users/" + dadosCritico.id,
            headers: { Authorization: "Bearer " + token },
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.equal(403);
            expect(response.body.error).to.be.eq('Forbidden');
            })
        })
    });

    it ("Prova que usuario não pode deletar, mas não dá o erro esperado", () => {
        cy.request({
            method: "DELETE",
            url: "/users/" + usuario.id,
            headers: { Authorization: "Bearer " + usuario.tokenComum },
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        })
    })

    //deslogar
    it ("Não deve ser possível excluir uma conta sem estar logado", () => {
        cy.request({
            method: 'DELETE',
            url: '/users/' + usuario.id,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.');
            expect(response.body.error).to.be.eq('Unauthorized');
        });
    });
//ivan
    it ("Não deve ser possível visualizar as avaliações de um filme feita por um usuário excluído", () => {
        cy.criarUsuarioAdmin().then(function (dadosAdmin) {
            const userAdmin = dadosAdmin;
            const tokenAdmin = dadosAdmin.token;
                cy.criarReview()
                cy.deletarUsuario(userAdmin.id, tokenAdmin).then
        }).then(() => {
            cy.buscaFilmeId(idFilme).then((response) => {
            expect(response.body.reviews).to.be.empty;
        });
        })
    })
})