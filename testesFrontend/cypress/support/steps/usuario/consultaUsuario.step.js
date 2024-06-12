import {
  Given,
  When,
  Then,
  Before,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import InicioPage from "../../pages/inicial.page";
import DetalhesFilmePage from "../../pages/detalhesFilme.page";
import LoginPage from "../../pages/login.page";
import PerfilPage from "../../pages/perfil.page";

const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();
const paginaPerfil = new PerfilPage();

let userAdmin;
let nota1; 
let nota2;

Before(function () {
  cy.visit("");
  cy.criarUsuarioAdmin().then(function (dadosAdmin) {
    cy.cadastrarFilme(dadosAdmin.token).then(function (filme1) {
      cy.cadastrarFilme(dadosAdmin.token).then(function (filme2) {
      userAdmin = dadosAdmin;

      cy.wrap(userAdmin).as("userAdmin");
      cy.wrap(filme1).as("dadosFilme1");
      cy.wrap(filme2).as("dadosFilme2");
    });
    });
  });
});

// After({ tags: "@deletar" }, function () {
//   cy.criarUsuarioAdmin().then(function (dadosAdmin) {
//     let userAdmin = dadosAdmin;
//     cy.wrap(userAdmin).as("userAdmin");
//     cy.get("@userAdmin").then(function (userAdmin) {
//       cy.get("@idFilme").then(function (response) {
//         cy.deletarFilme(response.body.id, userAdmin.token);
//         cy.deletarUsuario(userAdmin.id, userAdmin.token);
//       });
//     });
//   });
// });

Given("que o usuário está logado e autenticado na aplicação", function () {
  cy.get("@userAdmin").then(function (userAdmin) {
    let email = userAdmin.email;

    cy.visit("/login");
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha("123456");
    paginaLogin.clickButtonLogin();
  });
});

Given("que o usuário não está autenticado na aplicação", function () {});

When("o usuário acessa a seção de consulta de avaliações", function () {
  paginaInicial.clickPaginaPerfil();
});

When("o usuário tem avaliações de filme registradas", function () {
  cy.get("@dadosFilme1").then(function (response) {
    cy.criarReview(response.body.id, userAdmin.token).then(function(review1){
     
      cy.wrap(review1).as("reviewFilme1");
    });
    
  });
  cy.get("@dadosFilme2").then(function (response) {
    cy.criarReview(response.body.id, userAdmin.token).then(function(review2){
      nota1 = review2.score
      cy.wrap(review2).as("reviewFilme2");
    });
  });

});

Then("todas as avaliações feitas pelo usuário são exibidas", function () {
  cy.get("@dadosFilme1").then(function (dados) {
    
    cy.get(paginaPerfil.reviewCard1).should("contain", dados.body.title);
    cy.get(paginaPerfil.scoreFilme).should("be.visible");
  });
  cy.get("@dadosFilme2").then(function (dados) {
    
    cy.get(paginaPerfil.reviewCard2).should("contain", dados.body.title);
    cy.get(paginaPerfil.scoreFilme).should("be.visible");
  });

});

Then("as avaliações pertencem apenas ao usuário autenticado", function () {
  
    paginaPerfil.clickReviewCard1();
    cy.wait(4000);
    cy.get("@reviewFilme1").then(function (dados){
      cy.get(paginaDetalhes.reviewUsuarios).should("contain", dados.score)
      cy.get(paginaDetalhes.reviewUsuarios).should("contain", dados.comentario)
  });
    cy.go("back");
    cy.wait(4000);
    paginaPerfil.clickReviewCard2();
    cy.get("@reviewFilme2").then(function (dados){
    cy.get(paginaDetalhes.reviewUsuarios).should("contain", dados.score)
    cy.get(paginaDetalhes.reviewUsuarios).should("contain", dados.comentario)
});
});


Then("não existem avaliações duplicadas para o mesmo filme", function () {
  
  cy.get("@dadosFilme2").then(function (response) {
    cy.criarReview(response.body.id, userAdmin.token).then(function(review2){
      nota2 = review2.score
      cy.wrap(review2).as("reviewFilme2");
    });
  });
      cy.get(paginaDetalhes.reviewUsuarios).then(function(reviews){
        
        expect(nota1).to.not.equal(nota2);
        expect(response.body.length).to.equal(1);
      })
    })
        
   

Then("os detalhes do filme avaliado são exibidos", function () {});

Then(
  "existem avaliaçoes anteriores para o mesmo filme feita pelos perfis crítico e administrador",
  function () {}
);

Then("as avaliações devem estar marcadas conforme o perfil", function () {});

Then("que o usuário não possui avaliações registradas", function () {});

Then("e exibida uma lista de avaliçoes vazia", function () {});

Then("o acesso é negado", function () {});

Then("uma mensagem de erro é exibida", function () {});
