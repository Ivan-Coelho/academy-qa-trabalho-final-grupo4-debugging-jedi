import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import FilmesPage from '../pages/filmes.page';
import RegistroPage from '../pages/registro.page';
import { faker } from '@faker-js/faker';


Given('que acessei o site', function () {
    cy.visit('')
});

Given ('que o usuário inseriu o título completo do filme na caixa de pesquisa', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve retornar o filme correspondente ao título completo', function () {
    
})

Given ('que o usuário inseriu parte do título do filme na caixa de pesquisa', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve retornar todos os filmes que contêm o título parcial inserido', function () {
    
})

Given ('que o usuário inseriu um título com um pequeno erro de digitação', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve sugerir o filme correto ou retornar resultados relevantes próximos ao título inserido', function () {
    
})