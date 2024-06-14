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
        cy.cadastrarFilme2(dadosAdmin.token).then(function (response) {
            let userAdmin = dadosAdmin

            cy.wrap(userAdmin).as('userAdmin');
            cy.wrap(response.body).as('filme');
        });
    });
});

Before({ tags: '@cadastroFilmeReview' }, function () {

    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        cy.cadastrarFilme2(dadosAdmin.token).then(function (response) {

            let userAdmin = dadosAdmin
            cy.criarReview(response.body.id, dadosAdmin.token).then(function (nota) {
                let notaFilme = nota.score

                cy.wrap(notaFilme).as('nota')
                cy.wrap(userAdmin).as('userAdmin');
                cy.wrap(response.body).as('filme');
            });

        });
    });
});

After({ tags: '@deletar' }, function () {
    cy.get('@userAdmin').then(function (userAdmin) {
        cy.get('@filme').then(function (response) {
            cy.deletarFilme(response.id, userAdmin.token);
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
    cy.get('@filme').then(function (filme) {

        cy.intercept('GET', 'api/movies/search?*').as('pesquisa')

        paginaInicial.typeFilme(filme.title);
        paginaInicial.clickPesquisaFilme();
        cy.wait('@pesquisa')
        paginaInicial.clickFilme();
    })
});

When('informa uma nota', function () {
    paginaDetalhes.clickEstrela5();
});

When('informa um comentario para o filme', function () {
    paginaDetalhes.typeReview('O filme é emocionante')
});

When('envia a avaliação do filme', function () {
    paginaDetalhes.clickButtonSalvar();

});

Then('a avaliação do filme será criada com sucesso', function () {

    cy.get('@usuario').then(function (user) {
        cy.log(user)
        cy.contains(paginaDetalhes.nomeUsuario1, user.name)
        cy.contains(paginaDetalhes.comentarioUsuario1, 'O filme é emocionante')
        cy.get(paginaDetalhes.notausuario1).should('have.length', 5)
        cy.get(paginaDetalhes.datausuario1).should('be.visible')
    });
});

Then('a avaliação do filme será criada', function () {

    cy.get('@usuario').then(function (user) {
        cy.log(user)
        cy.contains(paginaDetalhes.nomeUsuario2, user.name)
        cy.contains(paginaDetalhes.comentarioUsuario2, 'O filme é emocionante')
        cy.get(paginaDetalhes.notausuario2).should('have.length', 5)
        cy.get(paginaDetalhes.datausuario2).should('be.visible')
    });
});

Then('a nota de audiência será alterada para a média', function () {
    cy.get('@nota').then(function (response) {
        let nota = response
        let sNota = (5 + nota)
        let media = (sNota)/2
        if (sNota % 2 == 0) {
            cy.get(paginaDetalhes.totalizadorAudiencia).should('have.length', media);
        } else {
            media = Math.floor(media)
            cy.get(paginaDetalhes.totalizadorAudiencia).should('have.length', media);
            cy.get(paginaDetalhes.totalizadorAudienciaQ).should('have.length', 1);
        }
    });
});