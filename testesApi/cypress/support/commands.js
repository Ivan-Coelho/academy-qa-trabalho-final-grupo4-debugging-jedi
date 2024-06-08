// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import { faker } from "@faker-js/faker"
// validar as URL
Cypress.Commands.add('criarUsuario', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    cy.request({
        method: 'POST',
        url: '/users',
        body: user
    }).then(function (response) {
        return response
    })
    
})


Cypress.Commands.add('criarUsuarioAdmin', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    let usuario
    let tokenAdmin
    let emailAdmin

    cy.request({
        method: 'POST',
        url: '/users',
        body: user
    }).then(function (response) {        
        usuario = response.body
        emailAdmin = response.body.email

        cy.request({
            method: "POST",
            url: '/auth/login',
            body: {
                email: usuario.email,
                password: "123456"
            }
        }).then(function (response) {
            
            tokenAdmin = response.body.accessToken
            

            cy.request({
                method: 'PATCH',
                url: '/users/admin',
                headers: { Authorization: 'Bearer ' + tokenAdmin }
            }).then(function () {
                return {
                    id: usuario.id,
                    token: tokenAdmin,
                    email:emailAdmin
                }
            })

        })
    })
})

Cypress.Commands.add('deletarUsuario', function (idUsuario, tokenAdmin) {
    cy.request({
        method: 'DELETE',
        url: '/users/' + idUsuario,
        headers: { Authorization: 'Bearer ' + tokenAdmin }
    })
})

Cypress.Commands.add('criarUsuarioCritico', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    let usuario
    let tokenCritico
    let emailCritico

    cy.request({
        method: 'POST',
        url: '/users',
        body: user
    }).then(function (response) {        
        usuario = response.body
        emailCritico = response.body.email

        cy.request({
            method: "POST",
            url: '/auth/login',
            body: {
                email: usuario.email,
                password: "123456"
            }
        }).then(function (response) {            
            tokenCritico = response.body.accessToken
            
            cy.request({
                method: 'PATCH',
                url: '/users/apply',
                headers: { Authorization: 'Bearer ' + tokenCritico }
            }).then(function () {
                return {
                    id: usuario.id,
                    token: tokenCritico,
                    email: emailCritico
                }
            })

        })
    })
})

Cypress.Commands.add('cadastrarFilme', function (tokenAdmin) {    
    cy.fixture("filmes/bodyFilme.json").then(function(arquivo){    
                
        cy.request({
            method: 'POST',
            url: '/movies',
            headers: { Authorization: 'Bearer ' + tokenAdmin },
            body: arquivo           
        })
    })    
})

Cypress.Commands.add('buscarFilme', function (titulo) {
    let idFilme
    return cy.request({
        method: 'GET',
        url: '/movies/search',
        qs: { title: titulo }
    }).then(function (response) {

        return idFilme = response.body[0].id
    })
})

Cypress.Commands.add('deletarFilme',function(idFilme, tokenAdmin){

    cy.request({
        method: 'DELETE',
        url: 'movies/' + idFilme,
        headers: { Authorization: 'Bearer ' + tokenAdmin }
    })

});