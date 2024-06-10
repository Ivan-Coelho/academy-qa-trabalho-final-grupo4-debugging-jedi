

describe("Consulta de avaliações do usuário", function(){
    describe("Consulta de Avaliações do Usuário Autenticado", function(){
        let dadosAdmin;
        let dadosFilme1;
        let idFilme1;
        let tokenAdmin;
       
        before(function () {
            cy.criarUsuarioAdmin().then(function (userAdmin) {
                dadosAdmin = userAdmin
               
            });
            cy.cadastrarFilme(dadosAdmin.token)
            .then(function (filme1) {
             dadosFilme1 = filme1.body
             idFilme1 = filme1
                
            expect(filme1.status).to.equal(201);
             });
        })

        after(function () {
            // cy.deletarFilme(idFilme1, dadosAdmin.token);
            // cy.deletarUsuario(dadosAdmin.id, dadosAdmin.token);
        });
        it("Consulta de Avaliações por Usuário ", function(){
            
      
            
            
        })
    })
})