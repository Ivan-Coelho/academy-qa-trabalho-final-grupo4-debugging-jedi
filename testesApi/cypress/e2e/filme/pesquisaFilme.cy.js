/// <reference types= "cypress"/>

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
    cy.buscarFilme(filme.title).then((response) => {
      expect(response).to.equal(filme.id);
    });
  });

  it("Deve ser possível pesquisar um filme com título parcial", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}`;
    cy.buscarFilme(tituloParcial).then((response) => {
      expect(response).to.equal(filme.id);
    });
  });

  // it("Deve ser possível pesquisar um filme com erro de digitação", () => {
  //   const tituloSplit = filme.title.split(" ");
  //   const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}S`;
  //   cy.buscarFilme(tituloParcial).then((response) => {
  //     expect(response).to.equal(filme.id);
  //   });
  // });

  it("Deve ser possível pesquisar um filme com letras maiúsculas", () => {
    cy.buscarFilme(filme.title.toUpperCase()).then((response) => {
      expect(response).to.equal(filme.id);
    });
  });

  it("Deve ser possível pesquisar um filme com letras minúsculas", () => {
     });

  it("Deve ser possível pesquisar um filme com letras maiúsculas e minúsculas misturadas", () => {});

  it("Não deve ser possível pesquisar um filme com título inexistente", () => {});

  it("Deve ser possível pesquisar um filme que contenha caracteres especiais no título", () => {});

  it("Deve ser possível pesquisar com um título muito curto", () => {});

  it("Deve ser possível pesquisar um filme com espaços extras no título", () => {});

  it("Deve ser possível pesquisar um filme que contenha caracteres especiais no título", () => {});

  it("Deve ser possível visualizar a descrição contida no súmario do filme encontrado", () => {});

  it("Deve ser possível visualizar a nota do filme encontrado", () => {});

  it("Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes", () => {});

  it("Deve ser possível um usuário comum realizar uma pesquisa no catálogo de filmes", () => {});

  it("Deve ser possível um usuário crítico  realizar uma pesquisa no catálogo de filmes", () => {});

  it("Deve ser possível um usuário administrador realizar uma pesquisa no catálogo de filmes", () => {});
});
