
describe("Criação de filme", function () {
    let dadosAdmin
    let dadosFilme
    let idFilme
    let dadosFilme1
    let dadosFilme2
    let idFilme1
    let idFilme2
    before(function () {
        cy.criarUsuarioAdmin().then(function (userAdmin) {
                dadosAdmin = userAdmin     
        });
    });

    after(function(){
        cy.deletarFilme(idFilme, dadosAdmin.token);
        cy.deletarFilme(idFilme1, dadosAdmin.token);
        cy.deletarFilme(idFilme2, dadosAdmin.token);
        cy.deletarUsuario(dadosAdmin.id, dadosAdmin.token);
       
    })


    describe("Cadastro de filme como usuario adminstrador", function () {
        it("Usuário administrador cadastra um filme com dados válidos", function () {
        cy.fixture("filmes/bodyFilme.json").then(function(filme){
            cy.request({
            method: "POST",
            url: "movies",
            body: filme,
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
          }).then(function (cadastrarFilme) {
            dadosFilme = cadastrarFilme.body
            idFilme = cadastrarFilme.body.id
            expect(cadastrarFilme.status).to.equal(201);
        
        cy.request({
            method: "GET",
            url: `movies/${idFilme}`,
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
            }).then(function (response) {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('id', idFilme);
            expect(response.body).to.have.property('title', dadosFilme.title);
            expect(response.body).to.have.property('genre', dadosFilme.genre);
            expect(response.body).to.have.property('description', dadosFilme.description);
            expect(response.body).to.have.property('durationInMinutes', dadosFilme.durationInMinutes);
            expect(response.body).to.have.property('releaseYear', dadosFilme.releaseYear);
              });
                });
            });
        });

        it("Usuário administrador tenta cadastrar um filme com dados incompletos", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
                title: "",
                genre: "",
                description:
                  "Caneta azul, azul caneta, Caneta azul tá marcada com minhas letra",
                durationInMinutes: 60,
                releaseYear: 2022,
              },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
         
          failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("genre should not be empty");
            expect(response.body.message).to.include("title should not be empty");

            })
        });

        it("Usuário administrador tenta cadastrar um filme com quantidade de caracteres do titulo invalidos", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
                title: "A Incrível Jornada da Caneta Azul e Seus Amigos na Terra dos Sonhos Encantados em Uma Aventura Sem Fim",
                genre: "Musical",
                description:
                  "Caneta azul, azul caneta, Caneta azul tá marcada com minhas letra",
                durationInMinutes: 120,
                releaseYear: 2022,
              },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
         
          failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("title must be shorter than or equal to 100 characters");
            

            })
        });

        it("Usuário administrador tenta cadastrar um filme com quantidade de caracteres do gênero invalidos", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
                title: "Caneta Azul",
                genre: "A Incrível Jornada da Caneta Azul e Seus Amigos na Terra dos Sonhos Encantados em Uma Aventura Sem Fim",
                description:
                  "Caneta azul, azul caneta, Caneta azul tá marcada com minhas letra",
                durationInMinutes: 120,
                releaseYear: 2022,
              },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
         
          failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("genre must be shorter than or equal to 100 characters");
            

            })
        });

        it("Usuário administrador tenta cadastrar um filme com quantidade de caracteres da descrição invalidos", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
                title: "Caneta Azul",
                genre: "Musical",
                description:
                  "A Incrível Jornada da Caneta Azul narra as aventuras de uma caneta mágica que ganha vida em uma noite estrelada. Junto com seus novos amigos, um caderno falante e uma borracha saltitante, eles embarcam em uma missão épica para salvar a Terra dos Sonhos Encantados das garras do temível Monstro da Tinta. Ao longo do caminho, eles enfrentam desafios surpreendentes, descobrem segredos antigos e aprendem o verdadeiro significado de amizade e coragem. Uma história emocionante e inesquecível para todas as idades",
                durationInMinutes: 120,
                releaseYear: 2022,
              },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
         
          failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("description must be shorter than or equal to 500 characters");
            

            })
        });
   

        it("Usuário administrador tenta cadastrar um filme com data de lançamento < 1895", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
            title: "Caneta Azul",
            genre: "Musical",
            description:
              "A Incrível Jornada da Caneta Azul narra as aventuras de uma caneta mágica",
            durationInMinutes: 120,
            releaseYear: 1894,
          },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
     
            failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("releaseYear must not be less than 1895");
            
                
            })
        })
        it("Usuário administrador tenta cadastrar um filme com data de lançamento > 2024", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
            title: "Caneta Azul",
            genre: "Musical",
            description:
              "A Incrível Jornada da Caneta Azul narra as aventuras de uma caneta mágica",
            durationInMinutes: 120,
            releaseYear: 2025,
          },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
     
            failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("releaseYear must not be greater than 2024");
            
                
            })
        })

        it("Usuário administrador tenta cadastrar um filme com duração de intervalo < 1 min", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
            title: "Caneta Azul",
            genre: "Musical",
            description:
              "A Incrível Jornada da Caneta Azul narra as aventuras de uma caneta mágica",
            durationInMinutes: 0.5,
            releaseYear: 2023,
          },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
     
            failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("durationInMinutes must not be less than 1");
            
                
            })
        })

        it("Usuário administrador tenta cadastrar um filme com duração de intervalo > 720horas", function () {
            cy.request({
            method: "POST",
            url: "movies",
            body: {
            title: "Caneta Azul",
            genre: "Musical",
            description:
              "A Incrível Jornada da Caneta Azul narra as aventuras de uma caneta mágica",
            durationInMinutes: 43201,
            releaseYear: 2023,
          },
            headers: { Authorization: 'Bearer ' + dadosAdmin.token },
     
            failOnStatusCode: false,
        }).then(function(response){
            expect(response.status).to.equal(400);
            expect(response.body).to.have.property("error");
            expect(response.body.error).to.include("Bad Request");
            expect(response.body.message).to.include("durationInMinutes must not be greater than 43200");
            
                
            })
        })
    
  
        it("Cadastrar o mesmo filme com novas informações", function () {
                  
          cy.cadastrarFilme(dadosAdmin.token)
        .then(function (filme1) {
          dadosFilme1 = filme1.body
          idFilme1 = filme1.body.id
          
          expect(filme1.status).to.equal(201);
        });

          const novasInformacoesFilme = {
          title: "Star Wars: O Império Contra-Ataca",
          genre: "Épico, Aventura, Ficção científica",
          description: "Regravação de As forças imperais comandadas por Darth Vader lançam um ataque contra os membros da resistência, que são obrigados a fugir. Enquanto isso, Luke Skywalker tenta encontrar o Mestre Yoda, que poderá ensiná-lo a dominar a Força e torná-lo um cavaleiro Jedi.",
          durationInMinutes: 124,
          releaseYear: 2000
          }

          cy.cadastrarFilme(dadosAdmin.token, novasInformacoesFilme)
          .then(function (filme2) {
          dadosFilme2 = filme2.body
          idFilme2 = filme2.body.id
          expect(filme2.status).to.equal(201);
          expect(idFilme2).to.not.equal(idFilme1);
          expect(dadosFilme2).to.not.equal(dadosFilme1)
          });
        });
        it("Cadastrar o mesmo filme com novas informações", function () {
                  
          cy.cadastrarFilme(dadosAdmin.token)
          .then(function (filme1) {
          dadosFilme1 = filme1.body
          idFilme1 = filme1.body.id
    
          expect(filme1.status).to.equal(201);
        });

          cy.cadastrarFilme(dadosAdmin.token)
          .then(function (filme2) {
          dadosFilme2 = filme2.body
          idFilme2 = filme2.body.id
          expect(filme2.status).to.equal(201);
          expect(idFilme2).to.not.equal(idFilme1);
          expect(dadosFilme2).to.not.equal(dadosFilme1)
          });
        });
      });
});


