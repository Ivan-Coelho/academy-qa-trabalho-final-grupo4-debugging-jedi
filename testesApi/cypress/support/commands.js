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

Cypress.Commands.add('usuarioLogado', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    let tokenComum
    let usuario

    cy.request({
        method: 'POST',
        url: '/users',
        body: user
    }).then(function (response) {
        usuario = response.body

        cy.request({
            method: "POST",
            url: '/auth/login',
            body: {
                email: usuario.email,
                password: "123456"
            }
        }).then(function (response) {
            tokenComum = response.body.accessToken
        }).then(function () {
            return {
                nome: user.name,
                email: user.email,
                id: usuario.id,
                token: tokenComum
            }
        })


    })
})

Cypress.Commands.add('usuarioLogado', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    let tokenComum
    let usuario

    cy.request({
        method: 'POST',
        url: '/users',
        body: user
    }).then(function (response) {
        usuario = response.body

        cy.request({
            method: "POST",
            url: '/auth/login',
            body: {
                email: usuario.email,
                password: "123456"
            }
        }).then(function (response) {
            tokenComum = response.body.accessToken
        }).then(function () {
            return {
                nome: user.name,
                email: user.email,
                id: usuario.id,
                token: tokenComum
            }
        })


    })
})


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

Cypress.Commands.add('usuarioLogado', function () {
    let user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456'
    }
    let tokenComum
    let usuario

    cy.request({
        method: 'POST',
        url: '/users',
        body: user
    }).then(function (response) {
        usuario = response.body

        cy.request({
            method: "POST",
            url: '/auth/login',
            body: {
                email: usuario.email,
                password: "123456"
            }
        }).then(function (response) {
            tokenComum = response.body.accessToken
        }).then(function () {
            return {
                nome: user.name,
                email: user.email,
                id: usuario.id,
                token: tokenComum
            }
        })


    })
})
