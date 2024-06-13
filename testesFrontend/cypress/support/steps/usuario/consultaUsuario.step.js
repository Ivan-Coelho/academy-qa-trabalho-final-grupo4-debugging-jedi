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
    cy.criarReview(response.body.id, userAdmin.token).then(function (review1) {
      cy.wrap(review1).as("reviewFilme1");
    });
  });
  cy.get("@dadosFilme2").then(function (response) {
     cy.criarReview( response.body.id, userAdmin.token).then(function (review2) {
      nota1 = review2.score;
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
  cy.get("@reviewFilme1").then(function (dados) {
    cy.get(".stars")
      .scrollIntoView()
      .should("be.visible")
      .then(function () {
        cy.get(".stars .filled").should("have.length", dados.score);
        cy.contains(dados.comentario);
      });
  });
  cy.go("back");
  cy.wait(4000);
  paginaPerfil.clickReviewCard2();
  cy.wait(4000);
  cy.get("@reviewFilme2").then(function (dados) {
    cy.get(".stars")
      .scrollIntoView()
      .should("be.visible")
      .then(function () {
        cy.get(".stars .filled").should("have.length", dados.score);
        cy.contains(dados.comentario);
      });
  });
});

Then("não existem avaliações duplicadas para o mesmo filme", function () {
  
    cy.get("@dadosFilme2").then(function (response) {
    cy.criarReview(response.body.id, userAdmin.token).then(function(review){
      
      cy.wrap(review).as("reviewFilme3");
    });
  });
    cy.get("@reviewFilme3").then(function (dados) {
      cy.get(paginaDetalhes.reviewScore3).then(function (dados) {
        cy.get(paginaDetalhes.reviewScore1).should("be.visible")
          .within(function(){
        cy.get('.stars .filled').should('have.length', review.score);
        
        //cy.get(paginaDetalhes.reviewScore2).should('have.length', 1);
        cy.get(paginaDetalhes.reviewScore2).contains('.stars .filled', dados.score);
      });
      });
    });
  });



Then("os detalhes do filme avaliado são exibidos", function () {
  cy.get("@reviewFilme1").then(function (dados) {
    cy.get(paginaDetalhes.cardReview).should("contain", dados.body.title)
    cy.get(paginaDetalhes.reviewScore1).should("be.visible")
  });
  cy.get("@reviewFilme2").then(function (dados) {
    cy.get(paginaDetalhes.cardReview).should("contain", dados.body.title)
    cy.get(paginaDetalhes.reviewScore2).should("be.visible")
  });
  
 
    
    });
  


 

Then(
  "existem avaliaçoes anteriores para o mesmo filme feita pelos perfis crítico e administrador",
  function () {

  });

Then("as avaliações devem estar marcadas conforme o perfil", function () {});

Then("que o usuário não possui avaliações registradas", function () {});

Then("e exibida uma lista de avaliçoes vazia", function () {});

Then("o acesso é negado", function () {});

Then("uma mensagem de erro é exibida", function () {});
