import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import  DetalhesFilmePage from "../pages/detalhesFilme.page";
const paginaFilme = new  DetalhesFilmePage

Before({tags: '@cadastroFilme'}, function(){
    cy.visit('')
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

Given("que o usuário está autenticado como administrador", function () {
    cy.visit("https://raromdb-frontend-c7d7dc3305a0.herokuapp.com");
  });