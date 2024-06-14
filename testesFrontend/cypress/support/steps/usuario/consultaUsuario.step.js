import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import InicioPage from "../../pages/inicial.page";
import DetalhesFilmePage from "../../pages/detalhesFilme.page";
import LoginPage from "../../pages/login.page";

const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();

// Before({ tags: "@consultaUsuario" }, function () {
//   cy.visit("");
//   cy.usuarioLogado().then(function (dadosUsuario) {
//     cy.cadastrarFilme(dadosUsuario.token).then(function (response) {
//       let userComum = dadosUsuario;

//       cy.wrap(userComum).as("userComum");
//       cy.wrap(response).as("idFilme");
//     });
//   });
// });

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
  cy.usuarioLogado().then(function (response) {
    let email = response.email;

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

Then("todas as avaliações feitas pelo usuário são exibidas", function () {
    cy.cadastrarFilme().then(function(){
        cy.criarReview()
    })
});

Then("as avaliações pertencem apenas ao usuário autenticado", function () {});

Then("não existem avaliações duplicadas para o mesmo filme", function () {});

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
