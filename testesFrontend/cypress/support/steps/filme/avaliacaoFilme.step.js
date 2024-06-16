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
    cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/auth/login').as('login')
    cy.criarUsuario().then(function (response) {

        let email = response.body.email

        cy.wrap(response.body).as('usuario');
        cy.visit('/login');
        paginaLogin.typeEmail(email);
        paginaLogin.typeSenha('123456');
        paginaLogin.clickButtonLogin();
        cy.wait('@login');
    });
});

When('acessa a página de detalhes de um filme', function () {
    cy.get('@filme').then(function (filme) {

        cy.intercept('GET', 'api/movies/search?*').as('pesquisa');

        paginaInicial.typeFilme(filme.title);
        paginaInicial.clickPesquisaFilme();
        cy.wait('@pesquisa');
        paginaInicial.clickFilme();
    });
});

// When('acessa a página de detalhes de um filme', function () {
//     cy.get('@filme').then(function(response){
//         idFilme = response.id
//         cy.visit('/movies/' + idFilme)
//     });
// });

When('informa uma nota', function () {
    paginaDetalhes.clickEstrela5();
});

When('informa um comentario para o filme', function () {
    paginaDetalhes.typeReview('O filme é emocionante');
});

When('envia a avaliação do filme', function () {
    paginaDetalhes.clickButtonSalvar();

});

When('cria uma review válida para um filme que já tenha avaliado', function(){
   cy.intercept('POST', 'https://raromdb-3c39614e42d4.herokuapp.com/api/users/review').as('espera')
    paginaDetalhes.criarReview('da para assistir');
    cy.wait('@espera')
    cy.wait(100)
    paginaDetalhes.typeReview('O filme é emocionante');
    paginaDetalhes.clickEstrela5();
    paginaDetalhes.clickButtonSalvar();
    cy.wait('@espera')

});

When('informa um comentario grande para o filme', function () {
    paginaDetalhes.typeReview('Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. Bom');
});

When('informa um comentario gigante para o filme', function () {
    paginaDetalhes.typeReview('Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. BOOM');
});


Then('a avaliação do filme será criada com sucesso', function () {

    cy.get('@usuario').then(function (user) {
        
        cy.contains(paginaDetalhes.nomeUsuario1, user.name);
        cy.contains(paginaDetalhes.comentarioUsuario1, 'O filme é emocionante');
        cy.get(paginaDetalhes.notausuario1).should('have.length', 5);
        cy.get(paginaDetalhes.datausuario1).should('be.visible');
    });
});

Then('a avaliação do filme será criada', function () {

    cy.get('@usuario').then(function (user) {
       
        cy.contains(paginaDetalhes.nomeUsuario2, user.name);
        cy.contains(paginaDetalhes.comentarioUsuario2, 'O filme é emocionante');
        cy.get(paginaDetalhes.notausuario2).should('have.length', 5);
        cy.get(paginaDetalhes.datausuario2).should('be.visible');
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

Then('a avaliação do filme será criada com sucesso sem o comentários', function () {

    cy.get('@usuario').then(function (user) {
        
        cy.contains(paginaDetalhes.nomeUsuario1, user.name);   
        cy.get(paginaDetalhes.notausuario1).should('have.length', 5);
        cy.get(paginaDetalhes.datausuario1).should('be.visible');
    });
});

Then('o sistema deverá retornar uma mensagem de alerta informando que é necessário informar uma nota', function(){
    cy.contains(paginaDetalhes.mensagemAlerta, 'Ocorreu um erro');
    cy.contains(paginaDetalhes.textoMensagemAlerta,'Selecione uma estrela para avaliar o filme');
});

Then('a alteração do totalizador de nota deverá ser observada', function(){
    // var data = new Date();    
    // cy.contains( data.toLocaleDateString())
    cy.get(paginaDetalhes.totalizadorAudiencia).should('have.length', 5)
});

Then('a review será atualizada', function(){
    cy.get('@usuario').then(function (user) {
       
        cy.contains(paginaDetalhes.nomeUsuario1, user.name);
        cy.contains(paginaDetalhes.comentarioUsuario1, 'O filme é emocionante');
        cy.get(paginaDetalhes.notausuario1).should('have.length', 5);
        cy.get(paginaDetalhes.datausuario1).should('be.visible');
    });

});

Then('não será possível criar uma segunda review para o mesmo filme', function(){
    cy.get(paginaDetalhes.totalReviewUsuarios).should('have.length', '1');
});

Then('a review do filme será criada com sucesso', function () {

    cy.get('@usuario').then(function (user) {
        
        cy.contains(paginaDetalhes.nomeUsuario1, user.name);
        cy.contains(paginaDetalhes.comentarioUsuario1, 'Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. Bom');
        cy.get(paginaDetalhes.notausuario1).should('have.length', 5);
        cy.get(paginaDetalhes.datausuario1).should('be.visible');
    });
});

Then('a review do filme não será criada com sucesso', function () {

    cy.get(paginaDetalhes.reviewUsuarios).should('not.be.visible')
});

