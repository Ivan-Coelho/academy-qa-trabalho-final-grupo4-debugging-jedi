/// <reference types= "cypress"/>

import { faker } from "@faker-js/faker";

describe("Pesquisar Filme", () => {
  it("Deve ser possível pesquisar um filme pelo título completo", () => {
    cy.buscarFilme()
  });

  it("Deve ser possível pesquisar um filme com título parcial", () => {});

  it("Deve ser possível pesquisar um filme com erro de digitação", () => {});

  it("Deve ser possível pesquisar um filme com letras maiúsculas", () => {});

  it("Deve ser possível pesquisar um filme com letras minúsculas", () => {});

  it("Deve ser possível pesquisar um filme com letras maiúsculas e minúsculas misturadas", () => {});

  it("Não deve ser possível pesquisar um filme com título inexistente", () => {});

  it("Deve ser possível pesquisar um filme que contenha caracteres especiais no título", () => {});

  it("Deve ser possível pesquisar com um título muito curto", () => {});

  it("Deve ser possível pesquisar um filme com espaços extras no título", () => {});

  it("Deve ser possível pesquisar um filme que contenha caracteres especiais no título", () => {});

  it("Deve ser possível visualizar uma imagem de capa do filme encontrado", () => {});

  it("Deve ser possível visualizar a descrição contida no súmario do filme encontrado", () => {});

  it("Deve ser possível visualizar a nota do filme encontrado", () => {});

  it("Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes", () => {});

  it("Deve ser possível um usuário comum realizar uma pesquisa no catálogo de filmes", () => {});

  it("Deve ser possível um usuário crítico  realizar uma pesquisa no catálogo de filmes", () => {});

  it("Deve ser possível um usuário administrador realizar uma pesquisa no catálogo de filmes", () => {});

});
