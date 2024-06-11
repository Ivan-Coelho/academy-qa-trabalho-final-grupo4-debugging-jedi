<reference types= "cypress"/>

import { faker } from "@faker-js/faker";

describe("Pesquisar Filme", () => {
  let usuarioAdmin;
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
  });
  it("Deve ser possível pesquisar um filme pelo título completo", () => {
    cy.buscarFilmeResponseCompleto(filme.title).then((response) => {
      expect(response.body[0].id).to.equal(filme.id);
    });
  });

  it("Deve ser possível pesquisar um filme com título parcial", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.body[0].id).to.equal(filme.id);
    });
  });


//Apagar no final
})