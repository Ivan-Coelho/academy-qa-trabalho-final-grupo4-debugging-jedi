import { faker } from "@faker-js/faker";

describe("Listar filme", () => {
  let usuarioAdmin;
  let usuarioComum;
  let usuarioCritico;
  let filme;

  beforeEach(() => {
    cy.criarUsuarioAdmin().then((response) => {
      usuarioAdmin = { ...response };
      const anoAtual = new Date().getFullYear();
      const filmeObj = {
        title: faker.lorem.words(10),
        genre: faker.lorem.words(3),
        description: faker.lorem.words(20),
        durationInMinutes: Math.floor(Math.random() * (140 - 100 + 1)) + 100,
        releaseYear: Math.floor(Math.random() * (anoAtual - 1895 + 1)) + 1895,
      };
      cy.cadastrarFilmeComBody(response.token, filmeObj).then((response) => {
        filme = { ...response };
      });
    });

    cy.criarUsuario().then((response) => {
      usuarioComum = { ...response.body };
    });

    cy.criarUsuarioCritico().then((response) => {
      usuarioCritico = { ...response };
    });
  });

  afterEach(() => {
    cy.deletarFilme(filme.id, usuarioAdmin.token);
    cy.deletarUsuario(usuarioComum.id, usuarioAdmin.token);
    cy.deletarUsuario(usuarioCritico.id, usuarioAdmin.token);
    cy.deletarUsuario(usuarioAdmin.id, usuarioAdmin.token);
  });

  it("Deve ser possível um usuário não logado consultar a lista de filmes", () => {
    let filmeNomeIncorreto = `${filme.title} nome errado`;
    cy.buscarListaFilme().then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });

  it("Deve ser possível um usuário comum consultar a lista de filmes", () => {
    cy.criarUsuario().then((response) => {
      cy.buscarListaFilme(response.token).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.above(0);
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].releaseYear).to.be.an("number");
        expect(response.body[0].totalRating).to.be.an("number");
        expect(response.body[0].title).to.be.an("string");
        expect(response.body[0].genre).to.be.an("string");
        expect(response.body[0].description).to.be.an("string");
        expect(response.body[0].durationInMinutes).to.be.an("number");
      });
    });
  });

  it("Deve ser possível um usuário crítico consultar a lista de filmes", () => {
    cy.buscarListaFilme(usuarioCritico.token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });

  it("Deve ser possível um usuário administrador consultar a lista de filmes", () => {
    cy.buscarListaFilme(usuarioAdmin.token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });

  it("Deve ser possível visualizar o título de um filme ao listar filmes", () => {
    cy.buscarListaFilme(usuarioAdmin.token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });

  it("Deve ser possível visualizar a descrição de um filme listado", () => {
    cy.buscarListaFilme(usuarioAdmin.token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });

  it("Deve ser possível visualizar a nota de um filme listado", () => {
    cy.buscarListaFilme(usuarioAdmin.token).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });

  it("Deve ser possível vizualizar filmes listados por nota (mais avaliados para menos avaliados)", () => {
    cy.buscarListaFilme(usuarioAdmin.token, true).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].totalRating).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");
    });
  });
});
