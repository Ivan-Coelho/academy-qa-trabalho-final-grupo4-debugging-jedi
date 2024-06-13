import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import InicioPage from '../../pages/inicial.page'
import DetalhesFilmePage from '../../pages/detalhesFilme.page';
import LoginPage from '../../pages/login.page';


const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();


Before({ tags: '@cadastroFilme' }, function () {

    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
            let userAdmin = dadosAdmin 

            cy.wrap(userAdmin).as('userAdmin');
            cy.wrap(response).as('filme');
        });
    });
});

After({ tags: '@deletar' }, function () {
    cy.get('@userAdmin').then(function (userAdmin) {
        cy.get('@filme').then(function (response) {
            cy.deletarFilme(response.body.id, userAdmin.token);
            cy.deletarUsuario(userAdmin.id, userAdmin.token);
        })
    })
})


Given('que usuário logado acessa o site', function () {
    
    cy.criarUsuario().then(function (response) {
        
        let email = response.body.email
        
        cy.wrap(response.body).as('usuario');
        cy.visit('/login')
        paginaLogin.typeEmail(email)
        paginaLogin.typeSenha('123456')
        paginaLogin.clickButtonLogin()       
    });
});

When('acessa a página de detalhes de um filme', function () {
    cy.intercept('GET', 'api/movies/search?*').as('pesquisa')

    paginaInicial.typeFilme('Star Wars: O Império Contra-Ataca');
    paginaInicial.clickPesquisaFilme();
    cy.wait('@pesquisa')
    paginaInicial.clickFilme();
       
});

When('informa uma nota', function(){
    paginaDetalhes.clickEstrela5();
});

When('informa um comentario para o filme', function(){
    paginaDetalhes.typeReview('O filme é emocionante')
});

When('envia a avaliação do filme', function(){
    paginaDetalhes.clickButtonSalvar();
    
});

Then('a avaliação do filme deve ser criada com sucesso', function(){
    const data = new Date();
    cy.log(data)
    
    cy.get('@usuario').then(function(user){
        cy.log(user)
        cy.contains(paginaDetalhes.nomeUsuario1, user.name )
        cy.contains(paginaDetalhes.comentarioUsuario1, 'O filme é emocionante')
        cy.get(paginaDetalhes.notausuario1).should('have.length', 5)
        cy.get(paginaDetalhes.datausuario1).should('be.visible')
    });
    

});
