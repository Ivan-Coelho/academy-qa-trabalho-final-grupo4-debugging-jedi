import {Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../pages/login.page';
import GerenciarContaPage from '../../pages/gerenciarConta.page';

const paginaLogin = new LoginPage();
const paginaGerenciarConta = new GerenciarContaPage();

let name;
let email;
let senha;
let id;
let tokenAdmin;
let idAdmin;

Before({tags:'@criarUser'}, function(){
    cy.criarUsuario().then(function(response){
       id=  response.body.id
       name= response.body.name
       email= response.body.email
       senha= '123456'

    });
});

After({tags:'@deltetarUser'}, function(){
           cy.criarUsuarioAdmin().then(function(response){
            tokenAdmin = response.token
            idAdmin = response.id
            cy.deletarUsuario(id, tokenAdmin);
            cy.deletarUsuario(idAdmin, tokenAdmin);
        })
});
Given('que usuário está logado e acessou a página de gerenciar conta', function () {
    cy.visit('login');
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha(senha)
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    paginaLogin.clickButtonLogin();
    cy.wait('@loginUser');
    paginaGerenciarConta.clickPaginaPerfil();
    paginaGerenciarConta.clickPaginaGerenciarConta();


});
When('eu informo um novo Nome', function(){
    paginaGerenciarConta.typeNome('Joaquina')
})

When('aciono a opção de alterar senha', function(){
    paginaGerenciarConta.clickButtonAlterarSenha()
})

When('informo a nova senha', function(){
    paginaGerenciarConta.typeSenha('654321')
})

When('informo a confirmação da senha que corresponda a nova senha', function(){
    paginaGerenciarConta.typeConfSenha('654321')
})

When('aciono a opção de salvar minhas informações', function(){
    paginaGerenciarConta.clickButtonSalvar()
})

Then('minhas informações serão alteradas', function(){
    cy.contains(paginaLogin.mensagemSucesso, "Sucesso").should('be.visible')

})

When("tento digitar um e-mail", function () {
    paginaGerenciarConta.emailDesabilitado()
});

When("informo um novo nome contendo 1 letra", function () {
    paginaGerenciarConta.typeNome('A')
});

When("informo um novo nome contendo 100 letras", function () {
    paginaGerenciarConta.typeNome('Sara Lucia Francisca Maria Rafaela Raiana Helena Joaquina da Silvas Ferreiras Sauros Menezes Scotti')
});

When("informo um novo nome contendo 99 letras", function () {
    paginaGerenciarConta.typeNome('Sarah Raquel Francisca Maria Rafaela Raiana Helena Joaquina da Silva Ferreira Sauros Menezes Scotti')
});

When("informo um novo nome contendo 101 letras", function () {
    paginaGerenciarConta.typeNome('Sharah Raquel Francisca Maria Rafaela Raiana Helena Joaquina da Silva Ferreira Sauros Menezes Scotti ')
});

Then('minhas informações não serão alteradas', function(){
    cy.contains(paginaLogin.mensagemErro, "O nome deve ter no máximo 100 dígitos").should('be.visible')
});

When("informo a nova senha contendo 7 caracteres", function () {
    paginaGerenciarConta.typeSenha('1234567')
});
When("informo a confirmação da senha correspondente", function () {
    paginaGerenciarConta.typeConfSenha('1234567')
});
When("informo a nova senha contendo 12 caracteres", function () {
    paginaGerenciarConta.typeSenha('123456789123')
});
When("confirmo a senha", function () {
    paginaGerenciarConta.typeConfSenha('123456789123')
});

When("informo a nova senha contendo 13 caracteres", function () {
    paginaGerenciarConta.typeSenha('1234567891234')
});
When("confirmo a nova senha", function () {
    paginaGerenciarConta.typeConfSenha('1234567891234')
});
Then('informações não serão alteradas', function(){
    cy.contains(paginaLogin.mensagem, "Ocorreu um erro").should('be.visible')
});

When('eu informo um novo nome com espaço em branco', function(){
    paginaGerenciarConta.typeNome('     ')
});

When("informo a nova senha contendo contendo espaços em branco", function () {
    paginaGerenciarConta.typeSenha('      ')
});
When("confirmo a senha nova", function () {
    paginaGerenciarConta.typeConfSenha('      ')
});