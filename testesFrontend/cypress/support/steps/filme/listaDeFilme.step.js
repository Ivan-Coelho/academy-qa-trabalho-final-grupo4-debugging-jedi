import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';

//Importar aqui os Page Objects para desenvolver os testes
import InicioPage from '../../pages/inicial.page'
import LoginPage from'../../pages/login.page';
import { faker } from '@faker-js/faker';

const paginaInicial = new InicioPage();
const paginaLogin = new LoginPage();


Given('que um usuário não logado acessou a página inicial', function () {
    cy.visit('')
    });

When('ele requisitar a opção filmes', function () {
    cy.get('.navbar-content > :nth-child(3)').click()
})

Then('deve ser possivél visualizar as informações sumarizadas de filmes', function () {
    cy.get('.featured-movies > .section-header').contains('Filmes em destaque').should('be.visible')
})

Given('que um usuário comum acessou página inicial', function () {
    cy.usuarioLogado().then(function(response){
        let email = response.email
        
        cy.visit('/login')
        paginaLogin.typeEmail(email)
        paginaLogin.typeSenha('123456')
        paginaLogin.clickButtonLogin()        

    });
    });

// Given('que um usuário não logado acessou a funcionalidade de listagem de filmes', function () {
//     cy.get('.navbar-content > :nth-child(3)').click()
// });

// When('ele visualizar a lista de filmes', function () {
//     cy.get('.featured-movies > .section-header').contains('Filmes em destaque').should('be.visible')    
// })

// Then('o sistema deve exibir as informações sumarizadas de todos os filmes cadastrados', function () {
//     cy.get('.featured-movies > .carousel-container > .carousel-data > [href="/movies/37"] > .movie-card-footer').to.have.property("description");
// })

// Given ('que um usuário comum acessou a funcionalidade de listagem de filmes', function () {
    
// })


// Given ('que um usuário crítico acessou a funcionalidade de listagem de filmes', function () {
    
// })


// Given ('que um usuário administrador acessou a funcionalidade de listagem de filmes', function () {
    
// })


// Given ('que um usuário acessou a página inicial', function () {
    
// })

// When('ele selecionar a opção filmes', function () {
    
// })

// Then('o card de um filme deverá conter o título do mesmo', function () {
    
// })


// Then('o card de um filme deverá conter a descrição correspondente ao mesmo', function () {
    
// })



// Then('o card de um filme deverá conter a sua nota geral', function () {
    
// })



// Then('os filmes cadastrados deverão ser listados conforme sua ordem de cadastro', function () {
    
// })


// Then('deverá haver uma opção de visualizar filmes mais bem avaliados', function () {
    
// })

// Given ('que um usuário acessou a lista de filmes', function () {
    
// })

// When('houver mais de 5 filmes cadastrados', function () {
    
// })

// Then('deverá existir a opção de paginação para explorar os filmes da lista', function () {
    
// })