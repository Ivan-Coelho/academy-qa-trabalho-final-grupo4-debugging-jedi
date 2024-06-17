describe ("Consultar Informações de Usuário", () =>{
    let usuario;
    let consultar;  
    let token;
    let userAdmin;

    beforeEach(() => {
        cy.criarUsuarioResponse().then((novoUsuario) => {
          usuario = novoUsuario;
        });
        cy.criarUsuarioResponse().then((novoUsuario) => {
          consultar = novoUsuario;
        });
      });
    

    it ("Sendo um usuário admin, deve ser possível consultar as informações do usuário", () =>{
      cy.login(usuario).then((login) => {
        token = login.body.accessToken
        cy.admin(token).then(function () {
          cy.request({
            method: 'GET',
            url: '/users/' + consultar.id,
            failOnStatusCode: false,
            auth: {
              bearer: token
            }
          }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.deep.include({
              id: consultar.id,
              name: consultar.name,
              email: consultar.email,
              active: consultar.active,
              type: consultar.type,
            })
          })
        })
      });
    });
    
    it ("Sendo um usuário comum, não deve ser possível consultar as informações do usuário", () =>{
        cy.login(usuario).then((login) => {
            token = login.body.accessToken
            cy.request({
              method: 'GET',
              url: '/users/' + consultar.id,
              failOnStatusCode: false,
              auth: {
                bearer: token
              }
            }).then((response) => {
              expect(response.status).to.equal(403);
              expect(response.body.message).to.equal("Forbidden")
            });
          });
    })

    it ("Sendo um crítico, não deve ser possível consultar as informações do usuário", () =>{
        cy.login(usuario).then((login) => {
            token = login.body.accessToken
            cy.criarUsuarioCritico(token).then(() => {
              cy.request({
                method: 'GET',
                url: '/users/' + consultar.id,
                failOnStatusCode: false,
                auth: {
                  bearer: token
                }
              }).then((response) => {
                expect(response.status).to.equal(403);
                expect(response.body.message).to.equal("Forbidden")
              });
            });
          });
    })
    
    it ("Não deve ser possível consultar as informações do usuário, buscando por um id inválido", () =>{
        cy.login(usuario).then((login) => {
            token = login.body.accessToken
            cy.criarUsuarioAdmin(token).then(function () {
              cy.request({
                method: 'GET',
                url: '/users/' + "122333444455555",
                failOnStatusCode: false,
                auth: {
                  bearer: token
                }
              }).then((response) => {
                expect(response.status).to.equal(403);
              })
            })
          });
    })
    
    it ("Não deve ser possível consultar as informações do usuário, sem fazer login", () =>{
        cy.request({
            method: 'GET',
            url: '/users/' + consultar.id,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.be.eq('Access denied.')
            expect(response.body.error).to.be.eq('Unauthorized')
          });
    })
})