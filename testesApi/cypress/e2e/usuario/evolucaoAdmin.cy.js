describe ("Inativar Usuários", () => {
    let usuario;
    let filme;

    beforeEach(function () {
        cy.criarUsuario().then((novoUsuario) => {
            usuario = novoUsuario;
        })
    })

    afterEach(() => {
        cy.deletarUsuario(usuario);
    })



it ("Um usuário comum pode se tornar Admin", () => {
    cy.login(usuario).then((login) => {
        token = login.body.accessToken
    }).then(function () {
        cy.request({
            method: 'PATCH',
            url: "/users/admin",
            auth: {
                bearer: token
            }
        }).then(function (response) {
            expect(response.status).to.equal(204);
        })
    });
})

it ("Um crítico comum pode se tornar Admin", () => {
    cy.login(usuario).then((login) => {
        token = login.body.accessToken
    }).then(function () {
        cy.criarUsuarioCritico(token).then(function () {
            cy.request({
                method: 'PATCH',
                url: '/api/users/admin',
                auth: {
                    bearer: token
                }
            }).then((response) => {
                expect(response.status).to.equal(204);
            })
        });
    })
})

it ("Não deve ser possível evoluir uma conta para Admin sem estar logado", () => {
    cy.request({
        method: 'PATCH',
        url: "/users/admin",
        failOnStatusCode: false,
    }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.be.eq('Access denied.')
        expect(response.body.error).to.be.eq('Unauthorized')
        });
    });

it ("Deve ser possível visualizar quando uma review de filme foi feita por um admin", () => {

})

it ("As review feitas por admin não deve impactar nas review de usuarios comuns", () => {

})

it ("As review feitas por admin não deve impactar nas review de usuarios críticos", () => {

})

it ("Deve ser possível diferenciar as reviews feitas por um usuário antes e depois de se tornar Administrador", () => {

})

})