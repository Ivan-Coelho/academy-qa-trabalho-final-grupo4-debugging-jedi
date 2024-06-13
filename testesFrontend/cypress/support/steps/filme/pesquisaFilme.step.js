import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import InicioPage from '../../pages/inicial.page'
import DetalhesFilmePage from '../../pages/detalhesFilme.page';
import LoginPage from'../../pages/login.page';


const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();

Given ('que o usuário acessou  a pagina inicial', function () {
    cy.visit('')
})

When('inserir o título completo do filme na barra de pesquisa', function () {
    
})

When('acionar o recurso de buscar', function () {
    
})

Then('o sistema deve retornar o filme correspondente ao título completo', function () {
    
})

// Given('que acessei o site Raro Filmes', function () {
   
// });

// Given ('que o usuário inseriu o título completo do filme na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título completo', function () {
    
// })

// Given ('que o usuário inseriu parte do título do filme na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar todos os filmes que contêm o título parcial inserido', function () {
    
// })

// Given ('que o usuário inseriu um título com um pequeno erro de digitação', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve sugerir o filme correto ou retornar resultados relevantes próximos ao título inserido', function () {
    
// })

// Given ('que o usuário inseriu o título do filme com letras maiúsculas', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar os resultados corretos, independentemente da formatação do texto.', function () {
    
// })

// Given ('que o usuário inseriu o título do filme com letras minúsculas', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar os resultados corretos, independentemente da formatação do texto', function () {
    
// })

// Given ('que o usuário inseriu o título do filme com diferentes combinações de maiúsculas e minúsculas', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar os resultados corretos, independentemente da formatação do texto.', function () {
    
// })

// Given ('que o usuário inseriu um título que não corresponde a nenhum filme no banco de dados', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve informar que não foram encontrados resultados para a pesquisa', function () {
    
// })

// Given ('que o usuário inseriu um título com caracteres especiais na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título inserido, incluindo os caracteres especiais', function () {
    
// })

// Given ('que o usuário inseriu um título muito curto (como uma única letra) na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar todos os filmes que contêm a letra inserida no título', function () {
    
// })

// Given ('que o usuário inseriu um título com espaços extras antes ou depois do texto', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve ignorar os espaços extras e retornar o filme correspondente ao título correto', function () {
    
// })

// Given ('que o usuário inseriu um título com caracteres especiais na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título inserido, incluindo os caracteres especiais', function () {
    
// })

// Given ('que o usuário inseriu um título na caixa de pesquisa', function () {
    
// })

// When('selecionar o recurso de pesquisar', function () {
    
// })

// Then('o sistema deverá retornar o filme correspondente e uma imagem de capa que o represente', function () {
    
// })

// Given ('que o usuário encontrou um filme pesquisado', function () {
    
// })

// When('selecionar o filme encontrado', function () {
    
// })

// Then('o sistema deverá retornar as informações contidas na descrição do filme selecionado', function () {
    
// })

// Given ('que o usuário encontrou um filme pesquisado', function () {
    
// })

// When('selecionar o filme encontrado', function () {
    
// })

// Then('o sistema deverá retornar as informações referente a nota de avaliação do filme retornado', function () {
    
// })

// Given ('que um usuário não logado inseriu um título de filme na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título inserido', function () {
    
// })

// Given ('que um usuário comum inseriu um título de filme na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título inserido', function () {
    
// })

// Given ('que um usuário crítico inseriu um título de filme na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título inserido', function () {
    
// })

// Given ('que um usuário administrador inseriu um título de filme na caixa de pesquisa', function () {
    
// })

// When('acionar o recurso de buscar', function () {
    
// })

// Then('o sistema deve retornar o filme correspondente ao título inserido', function () {
    
// })