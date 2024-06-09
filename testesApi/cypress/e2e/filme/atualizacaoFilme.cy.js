/// <reference types= "cypress"/>

import { faker } from "@faker-js/faker";

describe("Atualizar filme", () => {
  it("Deve ser possível atualizar um filme com sucesso", () => {});

  it("Deve ser possível atualizar parcialmente as informações de um filme", () => {});

  it("Não deve ser possível um usuário não logado realizar a atualização de um filme", () => {});

  it("Não deve ser possível um usuário comum realizar a atualização de um filme", () => {});

  it("Não deve ser possível um usuário crítico realizar a atualização de um filme", () => {});

  it("Não deve ser possível atualizar um filme com ano no futuro", () => {});

  it("Não deve ser possível atualizar um filme não cadastrado", () => {});

  it("Deve ser possível atualizar um filme com título de 1 caracter", () => {});

  it("Deve ser possível atualizar um filme com título de 100 caracteres", () => {});

  it("Não deve ser possível atualizar um filme com título de 101 caracteres", () => {});

  it("Deve ser possível atualizar um filme com gênero de 1 caracter", () => {});

  it("Deve ser possível atualizar um filme com gênero de 100 caracteres", () => {});

  it("Não deve ser possível atualizar um filme com gênero de 101 caracteres", () => {});

  it("Deve ser possível atualizar um filme com descrição de 1 caracter", () => {});

  it(" Deve ser possível atualizar um filme com descrição de 500 caracteres", () => {});

  it("Não deve ser possível atualizar um filme com descrição de 501 caracteres", () => {});

  it("Deve ser possível atualizar um filme com ano de lançamento 1895", () => {});

  it("Deve ser possível atualizar um filme com ano de lançamento 2024", () => {});

  it("Não deve ser possível atualizar um filme com ano de lançamento 1894", () => {});

  it("Não deve ser possível atualizar um filme com ano de lançamento 2025", () => {});

  it("Deve ser possível atualizar um filme de 1 minuto de duração", () => {});

  it("Deve ser possível atualizar um filme de 720 horas de duração", () => {});

  it("Não deve ser possível atualizar um filme com menos de 1 minuto de duração", () => {});

  it("Não deve ser possível atualizar um filme de 721 horas de duração", () => {});

});
