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
let notaComum;
let notaCritico;
let email;
let nome = "Teste Raro";
let tokenComum;

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

Before({ tags: "@filmeReviewCritico" }, function () {
  cy.criarUsuarioAdmin().then(function (dadosAdmin) {
    cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
      cy.wrap(dadosAdmin).as("userAdmin");
      cy.wrap(response).as("dadosFilme");

      cy.criarUsuarioCritico().then(function (dadosCritico) {
        cy.criarReview(response.body.id, dadosCritico.token).then(function (
          review
        ) {
          notaCritico = review.score;

          cy.inativarConta(dadosCritico.token);
          cy.wrap(sNota).as("somaNota");
        });
      });
    });
  });
});

//   After({ tags: '@deletar' }, function () {
//     cy.get('@userAdmin').then(function (userAdmin) {
//         cy.get('@dadosFilme').then(function (response) {
//             cy.deletarFilme(response.body.id, userAdmin.token);
//             cy.deletarUsuario(userAdmin.id, userAdmin.token);
//         })
//     })
// })

Given(
  "que o usuário comum está logado e autenticado na aplicação",
  function () {
    cy.visit("/login");
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha("123456");
    paginaLogin.clickButtonLogin();
  }
);

Given("que o usuário não está autenticado na aplicação", function () {});

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
  cy.get("@reviewComum").then(function () {
    cy.get(paginaDetalhes.cardReview)

      .should("be.visible")
      .then(function () {
        cy.get(paginaDetalhes.cardReviewNome)
          .invoke("text")
          .then(function (iniciais) {
            expect(iniciais).to.equal("TR");
          });
        cy.get(paginaDetalhes.reviewDetalhesScore)
          .should("be.visible")
          .then(function () {
            cy.get(".stars .filled").should("have.length", notaComum);
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
            cy.get(".stars .filled").should("have.length", notareview2);
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
  });
});

// Then(
//   "existem avaliaçoes anteriores para o mesmo filme feita pelos perfis crítico e administrador",
//   function () {

//   });

// Then("as avaliações devem estar marcadas conforme o perfil", function () {});

Then("que o usuário não possui avaliações registradas", function () {});

Then("e exibida uma lista de avaliçoes vazia", function () {
  cy.get(paginaDetalhes.cardReview).should("not.be.visible")

    cy.get(paginaDetalhes.reviewScore1).should("not.be.visible");
    cy.get(paginaDetalhes.reviewDetalhesScore).should("have.length", 1);
});

Then("o acesso é negado", function () {});

Then("uma mensagem de erro é exibida", function () {});
