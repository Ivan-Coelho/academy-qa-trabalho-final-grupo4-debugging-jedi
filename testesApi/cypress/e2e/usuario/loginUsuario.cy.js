import { faker } from "@faker-js/faker";

describe("Testes do método PUT da rota auth/login", function () {
  describe("Testes de Bad Request", function () {
    it("Deve receber Bad Request ao tentar autenticar um usuario nao cadastrado", function () {
      var email = faker.internet.email();
      var senha = "waD23e$";

      cy.request({
        method: "POST",
        url: "auth/login",
        body: {
          email: email,
          password: senha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(401);
        expect(response.body).to.have.property("error");
        expect(response.body.message).to.include(
          "Invalid username or password."
        );
      });
    });

    it("Deve receber Bad Request ao tentar autenticar um usuario sem informar senha", function () {
      var email = faker.internet.email();
      var senha = "waD23e$";

      cy.request({
        method: "POST",
        url: "auth/login",
        body: {
          email: email,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Bad Request");
        expect(response.body.message[0]).to.include(
          "password must be a string"
        );
        expect(response.body.message[1]).to.include(
          "password should not be empty"
        );
      });
    });

    it("Deve receber Bad Request ao tentar autenticar um usuario informando senha numerica", function () {
      var email = faker.internet.email();
      var senha = 123456;

      cy.request({
        method: "POST",
        url: "auth/login",
        body: {
          email: email,
          password: senha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Bad Request");
        expect(response.body.message).to.include("password must be a string");
      });
    });
    it("Deve receber Bad Request ao tentar autenticar um usuario sem informar email", function () {
      var senha = "waD23e$";

      cy.request({
        method: "POST",
        url: "auth/login",
        body: {
          password: senha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Bad Request");
        expect(response.body.message[0]).to.include(
          "email should not be empty"
        );
        expect(response.body.message[1]).to.include("email must be an email");
      });
    });
    it("Deve receber Bad Request ao tentar autenticar um usuario informando email invalido", function () {
      var email = "amm.com.br";
      var senha = "123456";

      cy.request({
        method: "POST",
        url: "auth/login",
        body: {
          email: email,
          password: senha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Bad Request");
        expect(response.body.message).to.include("email must be an email");
      });
    });
  });

  describe("Testes de Atutenticação com Sucesso", function () {
    let token;
    let email;
    var senha;

    beforeEach(function () {
      cy.criarUsuario().then(function (dadosUserComum) {
        email = dadosUserComum.body.email;
        senha = "123456";
        cy.autenticarUsuario(email, senha).then(function (response) {
          token = response.body.accessToken;
        });
      });
    });

    afterEach(function () {
      cy.autenticarUsuario(email, senha).then(function (response) {
        token = response.body.accessToken;
        cy.inativarUsuario(token);
      });
    });

    it("Deve autenticar usuário", function () {
      cy.request({
        method: "POST",
        url: "auth/login",
        body: {
          email: email,
          password: senha,
        },
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("accessToken");
        expect(response.body.accessToken).to.be.an("string");
      });
    });
  });
});
