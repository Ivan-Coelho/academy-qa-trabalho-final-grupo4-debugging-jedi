import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import InicioPage from '../pages/inicial.page'
// import DetalhesFilmePage from '../pages/detalhesFilme.page';


const paginaInicial = new InicioPage();
// const paginaDetalhes = new DetalhesFilmePage();

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
        cy.get('@idFilme').then(function(id){
            cy.deletarFilme(id, userAdmin.token);
            cy.deletarUsuario(userAdmin.id, userAdmin.token);
        })
    })    
})

Given('que usuario não cadastrado acessa o site', function(){
    cy.visit('')
});

When('acessa a página de detalhes de um filme', function(){    
    paginaInicial.typeFilme('Star Wars');
    paginaInicial.clickPesquisaFilme();
})

Then('usuário conseguirá ver a página de detalhes do filme', function(){
    cy.wait(5000)
});