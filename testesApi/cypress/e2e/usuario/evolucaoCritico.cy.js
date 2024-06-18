describe("Evolução para perfil crítico", function () {
  let userAdmin;
  let tokenAdmin;
  let userComum;

  after(function () {
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
      userAdmin = dadosAdmin;
      tokenAdmin = dadosAdmin.token;
      cy.deletarUsuario(userAdmin.id, tokenAdmin);
    });
  });

  describe("Evolução para perfil crítico com Usuário Autenticado", function () {
    it("Usuário com perfil comum solicita se tornar crítico", function () {
      cy.usuarioLogado().then(function (response) {
        userComum = response;

        cy.request({
          method: "PATCH",
          url: "/users/apply",
          headers: { Authorization: "Bearer " + userComum.token },
        }).then(function (response) {
          expect(response.status).to.equal(204);

          cy.criarUsuarioAdmin().then(function (dadosAdmin) {
            userAdmin = dadosAdmin;
            tokenAdmin = dadosAdmin.token;

            cy.listarUsuarioId(userComum.id, tokenAdmin).then(function (
              response
            ) {
              expect(response.status).to.equal(200);
              expect(response.body.active).to.equal(true);
              expect(response.body.id).to.equal(userComum.id);
              expect(response.body.type).to.equal(2);
            });
          });
        });
      });
    });
    it("Usuário com perfil Administrador solicita se tornar crítico", function () {
      cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        userAdmin = dadosAdmin;
        tokenAdmin = dadosAdmin.token;

        cy.request({
          method: "PATCH",
          url: "/users/apply",
          headers: { Authorization: "Bearer " + userAdmin.token },
        }).then(function (response) {
          expect(response.status).to.equal(204);

          cy.listarUsuarioId(userAdmin.id, tokenAdmin).then(function (
            response
          ) {
            expect(response.status).to.equal(200);
            expect(response.body.active).to.equal(true);
            expect(response.body.id).to.equal(userAdmin.id);
            expect(response.body.type).to.equal(2);
          });
        });
      });
    });
  });
  describe("Evolução para perfil crítico de usuario não logado/autorizado", function () {
    it("Não deve ser possivel que um usuário sem autenticação se torne crítico", function () {
      cy.usuarioLogado().then(function (response) {
        userComum = response;
        cy.request({
          method: "PATCH",
          url: "/users/apply",
          failOnStatusCode: false,
        }).then(function (response) {
          expect(response.status).to.equal(401);
          expect(response.body.error).to.include("Unauthorized");
          expect(response.body.message).to.include("Access denied.");
        });
        cy.criarUsuarioAdmin().then(function (dadosAdmin) {
          userAdmin = dadosAdmin;
          tokenAdmin = dadosAdmin.token;
          cy.listarUsuarioId(userComum.id, tokenAdmin).then(function (
            response
          ) {
            expect(response.status).to.equal(200);
            expect(response.body.active).to.equal(true);
            expect(response.body.id).to.equal(userComum.id);
            expect(response.body.type).to.equal(0);
          });
        });
      });
    });
  });
});
