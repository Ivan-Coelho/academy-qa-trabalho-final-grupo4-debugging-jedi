

describe("Consulta de avaliações do usuário", function(){
    
    describe("Consulta de Avaliações do Usuário Autenticado", function(){
        let idFilme;
        let userAdmin;
        let dadosReview1, dadosReview2;
        let dadosFilme;
        before(function () {
            cy.criarUsuarioAdmin().then(function (dadosAdmin) {
                userAdmin = dadosAdmin
            });
        });

        before(function () {
            cy.fixture('filmes/bodyReview.json').as('filme')
            cy.cadastrarFilme(userAdmin.token).then(function (response) {
                idFilme = response.body.id
                this.filme.id = idFilme
                dadosFilme = response
                
                   
                })
            })
        
        after(function () {
            cy.deletarFilme(idFilme, userAdmin.token)  
            cy.deletarUsuario(userAdmin.id, userAdmin.token)
        });

        
        it("Consulta de Avaliações por Usuário", function () {
            cy.criarReview(idFilme, userAdmin.token).then(function(response){
                dadosReview1 = response
            cy.request({
                method: "GET",
                url: "users/review/all",
                headers: { Authorization: 'Bearer ' + userAdmin.token }
           
        }).then(function(response){
            expect(response.status).to.equal(200);
            expect(response.body[0].movieId).to.equal(idFilme);
            expect(response.body[0].score).to.equal(dadosReview1.score);
             });
            });
        });

        it("Verificação de Avaliações Únicas por Filme", function(){
            cy.criarReview(idFilme, userAdmin.token).then(function(response){
                dadosReview1 = response
            cy.criarReview(idFilme, userAdmin.token).then(function(response){
                dadosReview2 = response
                    cy.log(dadosReview2) 
             })  
             cy.request({
                method: "GET",
                url: "users/review/all",
                headers: { Authorization: 'Bearer ' + userAdmin.token } 
            }).then(function(response){
                expect(response.status).to.equal(200);
                expect(response.body[0].movieId).to.equal(idFilme);
                expect(response.body[0].score).to.equal(dadosReview2.score);
                expect(dadosReview1.score).to.not.equal(dadosReview2.score);
                expect(response.body.length).to.equal(1);
                })
            })
        });
        it("Visualização de Detalhes das Avaliações", function(){
            cy.criarReview(idFilme, userAdmin.token).then(function(response){
                dadosReview1 = response
            cy.request({
                method: "GET",
                url: "users/review/all",
                headers: { Authorization: 'Bearer ' + userAdmin.token } 
            }).then(function(response){
                expect(response.status).to.equal(200);
                expect(response.body).to.have.length.of.at.least(1);

                expect(response.body[0].id).to.be.a("number");
                expect(response.body[0].movieId).to.be.equal(idFilme);
                expect(response.body[0].movieTitle).to.equal(dadosFilme.body.title);
            })
        })            
        
    })
})
});
