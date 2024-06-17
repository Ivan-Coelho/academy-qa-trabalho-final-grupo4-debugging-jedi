describe ("Inativar Usuários", () => {
    let userAdmin;
    let tokenAdmin;
    let userComum;

it ("Um usuário comum pode se tornar Admin", () => {
    cy.usuarioLogado().then(function (response) {
        userComum = response;

        cy.request({
          method: "PATCH",
          url: "/users/admin",
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
              expect(response.body.type).to.equal(1);
            });
          });
        });
      });
})

it ("Um crítico comum pode se tornar Admin", () => {
    cy.usuarioLogado().then(function (response) {
        userComum = response;

        cy.request({
          method: "PATCH",
          url: "/users/admin",
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
              expect(response.body.type).to.equal(1);
            });
          });
        });
      });
})

it ("Não deve ser possível evoluir uma conta para Admin sem estar logado", () => {
    cy.request({
        method: 'PATCH',
        url: "/users/admin",
        failOnStatusCode: false,
    }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.be.eq('Access denied.')
        expect(response.body.error).to.be.eq('Unauthorized')
        });
    });

})