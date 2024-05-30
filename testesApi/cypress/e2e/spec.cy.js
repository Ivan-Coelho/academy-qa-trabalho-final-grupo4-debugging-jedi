describe('testes de commands', function () {

  before(function () {
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
      let userAdmin = dadosAdmin
      cy.wrap(userAdmin).as('usuarioAdministrador')
    });

    cy.criarUsuario().then(function (dadosUserComum) {
      let userComum = dadosUserComum
      cy.wrap(userComum).as('usuarioComum')
    });

    cy.criarUsuarioCritico().then(function (dadosUserCritico) {
      let userCritico = dadosUserCritico
      cy.wrap(userCritico).as('usuarioCritico')
    }); 

  });

  after(function () {

    cy.get('@usuarioAdministrador').then(function (userAdmin) {
      cy.get('@usuarioCritico').then(function(userCritico){
        cy.get('@usuarioComum').then(function(userComum){ 
          
          cy.log(userComum);
          cy.log(userAdmin);
          cy.log(userAdmin);

          cy.deletarUsuario(userComum.body.id, userAdmin.token)
          cy.deletarUsuario(userCritico.id, userAdmin.token)
          cy.deletarUsuario(userAdmin.id, userAdmin.token)
        });        
      });     
    });
  });


  it('testando os custom commands', function () {

    cy.get('@usuarioAdministrador').then(function (userAdmin) {
      cy.log(userAdmin)

      cy.cadastrarFilme(userAdmin.token)
      cy.buscarFilme('Star Wars').then(function(response){
          let idFilme = response

          cy.deletarFilme(idFilme, userAdmin.token).then(function (response) {
            expect(response.status).to.equal(204);
          });          
        });

    });
  });
});


