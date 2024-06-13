import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import InicioPage from '../../pages/inicial.page'
import DetalhesFilmePage from '../../pages/detalhesFilme.page';
import LoginPage from'../../pages/login.page';

const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();


Before({tags: '@cadastroFilme'}, function(){
    
    cy.criarUsuarioAdmin().then(function(dadosAdmin){        
        cy.cadastrarFilme(dadosAdmin.token).then(function(response){
            let userAdmin = dadosAdmin
            
            cy.wrap(userAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');
        });
    })
});


After({tags: '@deletar'}, function(){
    cy.get('@userAdmin').then(function(userAdmin){
        cy.get('@idFilme').then(function(response){
            cy.deletarFilme(response.body.id, userAdmin.token);
            cy.deletarUsuario(userAdmin.id, userAdmin.token);
        })
    })    
})

Given ('que o usuário acessou  a pagina inicial', function () {
    cy.visit('')
})

Given('que um usuário logado acessou o site', function () {
    cy.usuarioLogado().then(function(response){
        let email = response.email
        
        cy.visit('/login')
        paginaLogin.typeEmail(email)
        paginaLogin.typeSenha('123456')
        paginaLogin.clickButtonLogin()        

    });
})


When('inserir o título completo do filme na barra de pesquisa', function () {
    paginaInicial.typeFilme('Star Wars: O Império Contra-Ataca')
})

When('acionar o recurso de buscar', function () {
    paginaInicial.clickPesquisaFilme()
})


Then('o sistema deve retornar o filme correspondente ao título completo', function () {
    cy.get('[href="/movies/1125"] > .movie-card-footer > .movie-title').contains('Star Wars').should('be.visible')
})

When('inserir apenas uma parte do título do filme na caixa de pesquisa', function () {
    paginaInicial.typeFilme('Star W')
})

When('inserir um título com um erro de digitação', function () {
    paginaInicial.typeFilme('Star WarsB')
})

Then('o sistema deve exibir uma mensagem de alerta: Nenhum filme encontrado', function () {
    cy.get('p').contains('Nenhum filme encontrado').should('be.visible')
})

When('inserir o título do filme com letras maiúsculas', function () {
    paginaInicial.typeFilme('STAR WARS')
})

When('inserir o título do filme com letras minúsculas', function () {
    paginaInicial.typeFilme('star wars')
})

When('inserir o título do filme com letras maiúsculas e minúsculas misturadas', function () {
    paginaInicial.typeFilme('sTaR wArS')
})

When('inserir um título que não corresponde a nenhum filme cadastrado', function () {
    paginaInicial.typeFilme('Istar uórz: u imperiu contar traca')
})

When('inserir um título com caracteres especiais na caixa de pesquisa', function () {
    paginaInicial.typeFilme('Star Wars #!$%')
})

When('inserir um título muito curto, como uma única letra na caixa de pesquisa', function () {
    paginaInicial.typeFilme('S')
})

Then('o sistema deve retornar todos os filmes que contêm a letra inserida no título', function () {
    cy.get('.search-movie-container').contains('S').should('be.visible')
})

When('inserir um título com espaços extras antes ou depois do texto', function () {
    paginaInicial.typeFilme('  Star Wars  ')
})

Then('o sistema deve ignorar os espaços extras e retornar o filme correspondente ao título correto.', function () {
    cy.get('[href="/movies/1125"] > .movie-card-footer > .movie-title').contains('Star Wars').should('be.visible')
})

Given ('que um usuário não logado acessou  a pagina inicial', function () {
    cy.visit('')
})

When('inserir um título de filme na caixa de pesquisa', function () {
    paginaInicial.typeFilme('Star Wars')
})

Then('o sistema deve retornar o filme correspondente ao título inserido.', function () {
    cy.get('[href="/movies/1125"] > .movie-card-footer > .movie-title').contains('Star Wars').should('be.visible')
})


