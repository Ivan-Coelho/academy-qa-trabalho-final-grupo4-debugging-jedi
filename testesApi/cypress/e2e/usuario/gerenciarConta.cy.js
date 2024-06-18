import { faker } from "@faker-js/faker";

describe("Testes do método PUT da rota /users", function () {
  var idUsuario;
  let token;
  var nome;
  var email;
  var senha;

  beforeEach(function () {
    cy.criarUsuario().then(function (dadosUserComum) {
      idUsuario = dadosUserComum.body.id;
      email = dadosUserComum.body.email;
      senha = "123456";
      cy.autenticarUsuario(email, senha).then(function (response) {
        token = response.body.accessToken;
      });
    });
  });

  afterEach(function () {
    cy.inativarUsuario(token);
  });

  describe("Testes de Unauthorized", function () {
    it("Deve receber Unauthorized ao tentar editar um usuário sem estar autenticado", function () {
      nome = faker.person.fullName();
      var novaSenha = "waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        body: {
          name: nome,
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(401);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Unauthorized");
        expect(response.body.message).to.include("Access denied");
      });
    });

    it("Deve receber Unauthorized ao tentar editar nome de um usuário sem estar autenticado", function () {
      nome = faker.person.fullName();
      var novaSenha = "waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        body: {
          name: nome,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(401);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Unauthorized");
        expect(response.body.message).to.include("Access denied");
      });
    });

    it("Deve receber Unauthorized ao tentar editar senha de um usuário sem estar autenticado", function () {
      var novaSenha = "waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        body: {
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(401);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Unauthorized");
        expect(response.body.message).to.include("Access denied");
      });
    });
  });

  describe("Testes de Bad Request", function () {
    //esse cenário está com bug, retorna 200 e atualiza o usuario
    it("Deve receber Bad Request ao tentar editar um usuário sem informar nome e senha", function () {
      nome = faker.person.fullName();
      var novaSenha = "waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {},
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Bad Request");
        expect(response.body.message).to.include(
          "Unexpected end of JSON input"
        );
      });
    });
    it("Deve receber Bad Request ao tentar editar um usuário inexistente", function () {
      nome = faker.person.fullName();
      var novaSenha = "waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + 90000000,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome,
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(403);
        expect(response.body).to.have.property("message");
        expect(response.body.message).to.include("Forbidden");
      });
    });
    it("Deve receber Bad Request ao tentar editar um usuário cujo nome possua mais de 100 caracteres", function () {
      var nome100 =
        "Juliana Moura Costa Soares Santos Miranda Souza Matos Dias Duarte Carvalho Rezende Leite Lima Magalhães";
      var novaSenha = "waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome100,
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.message).to.include(
          "name must be shorter than or equal to 100 characters"
        );
      });
    });

    it("Deve receber Bad Request ao tentar editar um usuário cuja senha possua 5 caracteres", function () {
      var novaSenha = "12345";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome,
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.message[0]).to.include(
          "password must be longer than or equal to 6 characters"
        );
      });
    });

    it("Deve receber Bad Request ao tentar editar um usuário cuja senha possua 5 caracteres", function () {
      var novaSenha = "1234567891123";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome,
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.message[0]).to.include(
          "password must be shorter than or equal to 12 characters"
        );
      });
    });
  });

  describe("Testes de atualização realizados por um usuário Comun", function () {
    it("Deve receber sucesso ao atualizar as informações de um usuário comum", function () {
      var outroNome = faker.person.fullName();
      var novaSenha = "233waD23$";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: outroNome,
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.name).to.equal(outroNome);
        expect(response.body.email).to.equal(email);
        expect(response.body.type).to.equal(0);
        expect(response.body.active).to.equal(true);
      });
    });

    it("Deve receber sucesso ao atualizar somente a senha  para um usuário comum", function () {
      var novaSenha = "12345678";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.email).to.equal(email);
        expect(response.body.type).to.equal(0);
        expect(response.body.active).to.equal(true);
      });
    });
    it("Dever recebe sucesso ao atualizar somente nome de um usuário comum", function () {
      var novoNome = faker.person.fullName();

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: novoNome,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.name).to.equal(novoNome);
        expect(response.body.email).to.equal(email);
        expect(response.body.type).to.equal(0);
        expect(response.body.active).to.equal(true);
      });
    });

    it("Deve receber sucesso ao atualizar uma senha  contendo 12 caracteres para um usuário comum", function () {
      var novaSenha = "123456789112";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.email).to.equal(email);
        expect(response.body.type).to.equal(0);
        expect(response.body.active).to.equal(true);
      });
    });

    it("Deve receber sucesso ao atualizar uma senha  contendo 6 caracteres para um usuário comum", function () {
      var novaSenha = "ABCDEF";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          password: novaSenha,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.email).to.equal(email);
        expect(response.body.type).to.equal(0);
        expect(response.body.active).to.equal(true);
      });

      it("Deve receber sucesso ao atualizar uma senha  contendo 6 caracteres para um usuário comum", function () {
        var novaSenha = "ABCDEF";

        cy.request({
          method: "PUT",
          url: "/users/" + idUsuario,
          headers: { Authorization: "Bearer " + token },
          body: {
            password: novaSenha,
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.be.eq(200);
          expect(response.body).to.have.property("id");
          expect(response.body).to.have.property("name");
          expect(response.body).to.have.property("email");
          expect(response.body).to.have.property("type");
          expect(response.body).to.have.property("active");
          expect(response.body.id).to.be.an("number");
          expect(response.body.name).to.be.an("string");
          expect(response.body.email).to.be.an("string");
          expect(response.body.type).to.be.an("number");
          expect(response.body.email).to.equal(email);
          expect(response.body.type).to.equal(0);
          expect(response.body.active).to.equal(true);
        });
      });
    });

    it("Deve receber sucesso ao atualizar um nome contendo 1 caractere para um usuário comum", function () {
      var nome1 = "A";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome1,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.name).to.equal(nome1);
      });
    });

    it("Dever recebe sucesso ao atualizar um nome contendo 100 caractere para um usuário comum", function () {
      var nome100 =
        "Julia Moura Costa Soares Santos Miranda Souza Matos Dias Duarte Carvalho Rezende Leite Lima  Castros";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome100,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.name).to.equal(nome100);
      });
    });

    it("Deve receber sucesso ao atualizar um nome contendo 99 caractere para um usuário comum", function () {
      var nome99 =
        "Julia Moura Costa Soares Santos Miranda Souza Matos Dia Duarte Carvalho Rezende Leite Lima  Castros";

      cy.request({
        method: "PUT",
        url: "/users/" + idUsuario,
        headers: { Authorization: "Bearer " + token },
        body: {
          name: nome99,
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.eq(200);
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("name");
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("type");
        expect(response.body).to.have.property("active");
        expect(response.body.id).to.be.an("number");
        expect(response.body.name).to.be.an("string");
        expect(response.body.email).to.be.an("string");
        expect(response.body.type).to.be.an("number");
        expect(response.body.name).to.equal(nome99);
      });
    });
  });
});
