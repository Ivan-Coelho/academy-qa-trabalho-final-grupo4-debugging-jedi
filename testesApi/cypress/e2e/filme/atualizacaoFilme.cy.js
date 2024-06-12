import { faker } from "@faker-js/faker";

describe("Atualizar filme", () => {
  let usuarioAdmin;
  let usuarioComum;
  let usuarioCritico;
  let filme;

  before(() => {
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
      usuarioComum = { ...response };
    });

    cy.criarUsuarioCritico().then((response) => {
      usuarioCritico = { ...response };
    });
  });

  it("Deve ser possível um usuario admin atualizar um filme com sucesso", () => {
    filme.genre = faker.lorem.words(5);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filme).then((response) => {
      expect(response.status).to.equal(204);
    });
  });


})