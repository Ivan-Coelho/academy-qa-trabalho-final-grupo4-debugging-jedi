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


let notaComum;

let email;
let nome = "Teste Raro";
let tokenComum;

// fazer o login pela pagina
Before({ tags: "@filmeReviewComum" }, function () {
  cy.criarUsuarioAdmin().then(function (dadosAdmin) {
    cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
      cy.wrap(dadosAdmin).as("userAdmin");
      cy.wrap(response).as("dadosFilmeC");

      cy.usuarioComumLogado().then(function (dadosComum) {
        email = dadosComum.email;
        tokenComum = dadosComum.token;
        cy.criarReview(response.body.id, dadosComum.token).then(function (
          reviewC
        ) {
          notaComum = reviewC.score;

          cy.wrap(reviewC).as("reviewComum");
          cy.wrap(dadosComum).as("userComum");
        });
      });
    });
  });
});

After({ tags: "@deletar" }, function () {
  cy.get("@userAdmin").then(function (userAdmin) {
    cy.get("@dadosFilmeC").then(function (response) {
      cy.deletarFilme(response.body.id, userAdmin.token);
      cy.deletarUsuario(userAdmin.id, userAdmin.token);
    });
  });
});

Given(
  "que o usuário comum está logado e autenticado na aplicação",
  function () {
    cy.visit("/login");
    cy.get(paginaLogin.campoLogin).should("be.visible");
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha("123456");
    paginaLogin.clickButtonLogin();
  }
);

When("o usuário acessa a seção de consulta de avaliações", function () {
  paginaInicial.clickPaginaPerfil();
});

When("o usuário comum tem avaliações de filme registradas", function () {
  cy.get("@dadosFilmeC").then(function (dados) {
    cy.get(paginaPerfil.reviewCard1).should("contain", dados.body.title);
    cy.get(paginaPerfil.scoreFilme).should("be.visible");
  });
});

Then("todas as avaliações feitas pelo usuário são exibidas", function () {
  cy.get(paginaDetalhes.cardReview).should("have.length", 1);
});

Then("as avaliações pertencem apenas ao usuário autenticado", function () {
  cy.get("@reviewComum").then(function (dados) {
    cy.get(paginaDetalhes.cardReview)

      .should("be.visible")
      .then(function () {
        cy.get(paginaDetalhes.cardReviewNome)
          .invoke("text")
          .then(function (iniciais) {
            expect(iniciais).to.equal("TR");

            cy.get(paginaDetalhes.reviewDetalhesScore)
              .should("be.visible")
              .then(function () {
                cy.get(".stars .filled").should("have.length", notaComum);
              });
          });
      });
  });
});

Then("não existem avaliações duplicadas para o mesmo filme", function () {
  cy.get("@dadosFilmeC").then(function (response) {
    cy.criarReview(response.body.id, tokenComum).then(function (review2) {
      let notareview2 = review2.score;

      cy.wrap(review2).as("reviewComum2");

      cy.get("@reviewComum2").then(function (dados) {
        cy.get(paginaDetalhes.reviewDetalhesScore)
          .should("be.visible")
          .then(function () {
            cy.get(paginaDetalhes.reviewScore1).should("be.visible");
          });
        cy.get(paginaDetalhes.reviewDetalhesScore).should("have.length", 1);
      });
    });
  });
});

Then("os detalhes do filme avaliado são exibidos", function () {
  cy.get("@dadosFilmeC").then(function (dados) {
    cy.get(paginaDetalhes.cardReview).should("contain", dados.body.title);

    cy.get(paginaDetalhes.reviewScore1).should("be.visible");
    paginaPerfil.clickReviewCard1();
    cy.wait(4000);
    cy.url().should("include", "movies/" + dados.body.id);
  });
});

Then("que o usuário não possui avaliações registradas", function () {
  cy.get("@userAdmin").then(function (userAdmin) {
    cy.get("@dadosFilmeC").then(function (response) {
      cy.deletarFilme(response.body.id, userAdmin.token);
    });
  });
});

Then("e exibida uma lista de avaliçoes vazia", function () {
  cy.get(paginaDetalhes.cardReview).should("not.exist");
  cy.get(".ratings-container").should("be.empty");
  cy.get(paginaDetalhes.reviewScore1).should("not.exist");
  cy.get(paginaDetalhes.reviewDetalhesScore).should("have.length", 0);
});
