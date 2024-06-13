import { faker } from '@faker-js/faker';

describe('Testes do método POST da rota /users', function () {
  describe('Testes de Bad requests', function () {

    it('Deve receber bad request ao tentar cadastrar um usuário sem e-mail', function () {
      cy.request({
        method: 'POST',
        url: '/users',
        body: {
          name: 'Maria da Silva',
          password: '123456'
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400)
        expect(response.body).to.have.property('error')
        expect(response.body.message[0]).to.include('email must be longer than or equal to 5 characters')
        expect(response.body.message[1]).to.include('email must be an email')
        expect(response.body.message[2]).to.include('email should not be empty')
      });
    });
    it('Deve receber bad request ao tentar cadastrar um usuário sem nome', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            email: faker.internet.email(),
            password: '123456'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('name must be longer than or equal to 1 characters')
          expect(response.body.message[1]).to.include('name must be a string')
          expect(response.body.message[2]).to.include('name should not be empty')
        });
      });

    it('Deve receber bad request ao tentar cadastrar um usuário sem senha', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            name: 'Fatima Leite',
            email: faker.internet.email()
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('password must be longer than or equal to 6 characters')
          expect(response.body.message[1]).to.include('password must be a string')
          expect(response.body.message[2]).to.include('password should not be empty')
        });
      });

    it('Deve receber bad request ao tentar cadastrar um usuário com e-mail invalido', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            name: 'Fatima Leite',
            email: 'teste@',
            password: '123456'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('email must be an email')
        });
      }); 
    it('Deve receber bad request ao tentar cadastrar um usuário com e-mail contendo 61 caracteres', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            name: 'Fatima Leite',
            email: 'emailcommaisdesesentaeumcaracteres123456798101@dominio.com.br',
            password: '123456'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('email must be shorter than or equal to 60 characters')
        });
      });
    it('Deve receber bad request ao tentar cadastrar um usuário com e-mail sem domínio - @dominio.com', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            name: 'Fatima Leite',
            email: 'emailsemdominio',
            password: '123456'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('email must be an email')
        });
      }); 

    it('Deve receber bad request ao tentar cadastrar um usuário cujo nome possui mais de 100 carcteres', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            name: 'Juliana Moura Costa Soares Santos Miranda Souza Matos Dias Duarte Carvalho Rezende Leite Lima Magalhães',
            email: 'email@dominio.com',
            password: '123456'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('name must be shorter than or equal to 100 characters')
        });
      });    
      
    it('Deve receber bad request ao tentar cadastrar um usuário cuja senha possua 5 caracteres', function () {
        cy.request({
          method: 'POST',
          url: '/users',
          body: {
            name: 'Davi',
            email: 'email@dominio.com',
            password: '1234567891123'
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(400)
          expect(response.body).to.have.property('error')
          expect(response.body.message[0]).to.include('password must be shorter than or equal to 12 characters')
        });
      });   

      it('Deve receber bad request ao tentar cadastrar umr usuário com e-mail já utilizado', function () {
        const name = faker.person.fullName();
        const email = faker.internet.email();
  
        cy.request('POST', '/users', {
          name: name,
          email: email,
          password: '123456'
        }).then((response) => {
  
          cy.request({
            method: 'POST',
            url: '/users',
            body: {
              name: name,
              email: email,
              password: '123456'
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(409);
            expect(response.body).to.have.property('error');
            expect(response.body.message).to.include('Email already in use');
          });
        });
  
      });
  
    }) 
   
describe('Testes de criação de usuário', function () {
      var idUsuario;
      var name;
      var senha = '123456';
      var email;
      var token;
      const tipoUsuarioComum = 0;
      const usuarioAtivo = true;
  
      afterEach(function () {
        cy.autenticarUsuario(email, senha).then(function (response) {
          token = response.body.accessToken;
          cy.inativarUsuario(token);
        })
      }) 

      it('Deve ser possível criar usuário com dados válidos', function () {

        name = faker.person.fullName();
        email = faker.internet.email().toLowerCase();
  
        cy.request('POST', '/users', {
          name: name,
          email: email,
          password: senha
        }).then(function (response) {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('email');
          expect(response.body).to.have.property('type');
          expect(response.body).to.have.property('active');
          expect(response.body.id).to.be.an('number');
          expect(response.body.name).to.be.an('string');
          expect(response.body.email).to.be.an('string');
          expect(response.body.type).to.be.an('number');
          expect(response.body.name).to.equal(name);
          expect(response.body.email).to.equal(email);
          expect(response.body.type).to.equal(tipoUsuarioComum);
          expect(response.body.active).to.equal(usuarioAtivo);
  
  
  
        });
      });

      it('Deve ser possível criar usuário cujo email possua 6 caracteres ', function () {

        name = faker.person.fullName();
        email = 'a@i.co';
  
        cy.request('POST', '/users', {
          name: name,
          email: email,
          password: senha
        }).then(function (response) {
          expect(response.status).to.equal(201);
          expect(response.body).to.have.property('id');
          expect(response.body).to.have.property('name');
          expect(response.body).to.have.property('email');
          expect(response.body).to.have.property('type');
          expect(response.body).to.have.property('active');
          expect(response.body.id).to.be.an('number');
          expect(response.body.name).to.be.an('string');
          expect(response.body.email).to.be.an('string');
          expect(response.body.type).to.be.an('number');
          expect(response.body.name).to.equal(name);
          expect(response.body.email).to.equal(email);
          expect(response.body.type).to.equal(tipoUsuarioComum);
          expect(response.body.active).to.equal(usuarioAtivo);
        });
      });

    })   
  
  })      