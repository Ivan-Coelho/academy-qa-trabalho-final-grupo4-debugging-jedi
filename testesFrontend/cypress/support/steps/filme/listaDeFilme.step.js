import {  Given,  When, Then,  Before,  After,} from "@badeball/cypress-cucumber-preprocessor";

//Importar aqui os Page Objects para desenvolver os testes
import InicioPage from "../../pages/inicial.page";
import LoginPage from "../../pages/login.page";
import { faker } from "@faker-js/faker";

const paginaInicial = new InicioPage();
const paginaLogin = new LoginPage();

Given("que um usuário não logado acessou a página inicial", function () {
  cy.visit("");
});

When("ele requisitar a opção filmes", function () {
  cy.visit("");
  cy.get(".navbar-content > :nth-child(3)").click();
});

Then(
  "deve ser possivél visualizar as informações sumarizadas de filmes",
  function () {
    cy.get(".featured-movies > .section-header")
      .contains("Filmes em destaque")
      .should("be.visible");
  }
);

Given("que um usuário comum acessou página inicial", function () {
  cy.usuarioLogado().then(function (response) {
    let email = response.email;

    cy.visit("/login");
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha("123456");
    paginaLogin.clickButtonLogin();
  });
});

Given("que um usuário admin acessou página inicial", function () {
  cy.criarUsuarioAdmin().then(function (dadosAdmin) {
    let userAdmin = dadosAdmin;
    cy.wrap(userAdmin).as("userAdmin");
  });
});

Given("que um usuário acessou a página inicial", function () {
    cy.visit("");
  });

  When("o card de um filme deverá conter o título do mesmo", function () {
    cy.get('.featured-movies > .carousel-container > .carousel-data > [href="/movies/1"]').contains('.movie-title').should('be.visible')
  });

  Then("deverá haver uma opção de visualizar filmes mais bem avaliados", function () {
    cy.get('.top-rated-movies > .section-header > h3').contains('Mais bem avaliados').should('be.visible')
  });

  Then("deverá existir a opção de paginação para explorar os filmes da lista", function () {
    cy.get('.top-rated-movies > .carousel-container > :nth-child(3)').click()
  });