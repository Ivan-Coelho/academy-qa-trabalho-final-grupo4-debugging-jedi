import { faker } from "@faker-js/faker";

describe("Atualizar filme", () => {
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

  it("Deve ser possível um usuario admin atualizar um filme com sucesso", () => {
    filme.genre = faker.lorem.words(5);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filme).then((response) => {
      expect(response.status).to.equal(204);
      expect(response.statusText).to.equal("No Content");
    });
  });

  it("Não deve ser possível um usuário não logado realizar a atualização de um filme", () => {
    filme.genre = faker.lorem.words(5);
    cy.atualizarFilme(null, filme.id, filme).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.statusText).to.equal("Unauthorized");
      expect(response.body.error).to.equal("Unauthorized");
      expect(response.body.message).to.equal("Access denied.");
      expect(response.body.statusCode).to.equal(401);
    });
  });

  it("Não deve ser possível um usuário comum realizar a atualização de um filme", () => {
    filme.genre = faker.lorem.words(5);
    cy.atualizarFilme(usuarioComum.token, filme.id, filme).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.statusText).to.equal("Unauthorized");
      expect(response.body.error).to.equal("Unauthorized");
      expect(response.body.message).to.equal("Access denied.");
      expect(response.body.statusCode).to.equal(401);
    });
  });

  it("Não deve ser possível um usuário crítico realizar a atualização de um filme", () => {
    filme.genre = faker.lorem.words(5);
    cy.atualizarFilme(usuarioCritico.token, filme.id, filme).then(
      (response) => {
        expect(response.status).to.equal(403);
        expect(response.statusText).to.equal("Forbidden");
        expect(response.body.message).to.equal("Forbidden");
        expect(response.body.statusCode).to.equal(403);
      }
    );
  });

  it("Não deve ser possível atualizar um filme com ano no futuro", () => {
    let filmeNovo = { ...filme };
    filmeNovo.releaseYear = new Date().getFullYear() + 5;
    cy.atualizarFilme(usuarioAdmin.token, filmeNovo.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it("Não deve ser possível atualizar um filme não cadastrado", () => {
    let filmeNovo = { ...filme };
    filmeNovo.genre = faker.lorem.words(5);
    cy.atualizarFilme(usuarioAdmin.token, 0, filmeNovo).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.statusText).to.equal("Not Found");
      expect(response.body.error).to.equal("Not Found");
      expect(response.body.message).to.equal("Movie not found");
    });
  });

  it("Deve ser possível atualizar um filme com título de 1 caracter", () => {
    let filmeNovo = { ...filme };
    filmeNovo.title = faker.string.alpha(1);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Deve ser possível atualizar um filme com título de 100 caracteres", () => {
    let filmeNovo = { ...filme };
    filmeNovo.title = faker.string.alpha(100);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Não deve ser possível atualizar um filme com título de 101 caracteres", () => {
    let filmeNovo = { ...filme };
    filmeNovo.title = faker.string.alpha(101);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it("Deve ser possível atualizar um filme com gênero de 1 caracter", () => {
    let filmeNovo = { ...filme };
    filmeNovo.genre = faker.string.alpha(1);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Deve ser possível atualizar um filme com gênero de 100 caracteres", () => {
    let filmeNovo = { ...filme };
    filmeNovo.genre = faker.string.alpha(100);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Não deve ser possível atualizar um filme com gênero de 101 caracteres", () => {
    let filmeNovo = { ...filme };
    filmeNovo.genre = faker.string.alpha(101);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it("Deve ser possível atualizar um filme com descrição de 1 caracter", () => {
    let filmeNovo = { ...filme };
    filmeNovo.description = faker.string.alpha(1);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it(" Deve ser possível atualizar um filme com descrição de 500 caracteres", () => {
    let filmeNovo = { ...filme };
    filmeNovo.description = faker.string.alpha(500);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Não deve ser possível atualizar um filme com descrição de 501 caracteres", () => {
    let filmeNovo = { ...filme };
    filmeNovo.description = faker.string.alpha(501);
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it("Deve ser possível atualizar um filme com ano de lançamento 1895", () => {
    let filmeNovo = { ...filme };
    filmeNovo.releaseYear = 1895;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it(`Deve ser possível atualizar um filme com ano de lançamento atual [${new Date().getFullYear()}]`, () => {
    let filmeNovo = { ...filme };
    filmeNovo.releaseYear = new Date().getFullYear();
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Não deve ser possível atualizar um filme com ano de lançamento 1894", () => {
    let filmeNovo = { ...filme };
    filmeNovo.releaseYear = 1894;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it(`Não deve ser possível atualizar um filme com ano de lançamento [${
    new Date().getFullYear() + 1
  }]`, () => {
    let filmeNovo = { ...filme };
    filmeNovo.releaseYear = new Date().getFullYear() + 1;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it("Deve ser possível atualizar um filme de 1 minuto de duração", () => {
    let filmeNovo = { ...filme };
    filmeNovo.durationInMinutes = 1;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Deve ser possível atualizar um filme de 720 horas de duração", () => {
    let filmeNovo = { ...filme };
    filmeNovo.durationInMinutes = 720;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });

  it("Não deve ser possível atualizar um filme com menos de 1 minuto de duração", () => {
    let filmeNovo = { ...filme };
    filmeNovo.durationInMinutes = 0;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(400);
        expect(response.statusText).to.equal("Bad Request");
        expect(response.body.error).to.equal("Bad Request");
        expect(response.body.message).to.be.an("array");
        expect(response.body.statusCode).to.equal(400);
      }
    );
  });

  it("Deve ser possível atualizar um filme de 721 horas de duração", () => {
    let filmeNovo = { ...filme };
    filmeNovo.durationInMinutes = 721;
    cy.atualizarFilme(usuarioAdmin.token, filme.id, filmeNovo).then(
      (response) => {
        expect(response.status).to.equal(204);
        expect(response.statusText).to.equal("No Content");
      }
    );
  });
});

