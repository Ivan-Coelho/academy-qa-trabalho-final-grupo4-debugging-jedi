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

Given ('que o usuário inseriu o título do filme com letras maiúsculas', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve retornar os resultados corretos, independentemente da formatação do texto.', function () {
    
})

Given ('que o usuário inseriu o título do filme com letras minúsculas', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve retornar os resultados corretos, independentemente da formatação do texto', function () {
    
})

Given ('que o usuário inseriu o título do filme com diferentes combinações de maiúsculas e minúsculas', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve retornar os resultados corretos, independentemente da formatação do texto.', function () {
    
})

Given ('que o usuário inseriu um título que não corresponde a nenhum filme no banco de dados', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve informar que não foram encontrados resultados para a pesquisa', function () {
    
})