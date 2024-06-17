import { faker } from "@faker-js/faker";

describe("Pesquisar Filme", () => {
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

  it("Deve ser possível pesquisar um filme pelo título completo", () => {
    cy.buscarFilmeResponseCompleto(filme.title).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");

      expect(response.body[0].id).to.equal(filme.id);
      expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
      expect(response.body[0].title).to.equal(filme.title);
      expect(response.body[0].genre).to.equal(filme.genre);
      expect(response.body[0].description).to.equal(filme.description);
      expect(response.body[0].durationInMinutes).to.equal(
        filme.durationInMinutes
      );
    });
  });

  it("Deve ser possível pesquisar um filme com título parcial", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");

      expect(response.body[0].id).to.equal(filme.id);
      expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
      expect(response.body[0].title).to.equal(filme.title);
      expect(response.body[0].genre).to.equal(filme.genre);
      expect(response.body[0].description).to.equal(filme.description);
      expect(response.body[0].durationInMinutes).to.equal(
        filme.durationInMinutes
      );
    });
  });

  it("Não deve ser possível pesquisar um filme com erro de digitação", () => {
    let filmeNomeIncorreto = `${filme.title} nome errado`;
    cy.buscarFilmeResponseCompleto(filmeNomeIncorreto).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.empty;
    });
  });

  it("Deve ser possível pesquisar um filme com letras maiúsculas", () => {
    cy.buscarFilmeResponseCompleto(filme.title.toUpperCase()).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.above(0);
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].releaseYear).to.be.an("number");
        expect(response.body[0].title).to.be.an("string");
        expect(response.body[0].genre).to.be.an("string");
        expect(response.body[0].description).to.be.an("string");
        expect(response.body[0].durationInMinutes).to.be.an("number");

        expect(response.body[0].id).to.equal(filme.id);
        expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
        expect(response.body[0].title).to.equal(filme.title);
        expect(response.body[0].genre).to.equal(filme.genre);
        expect(response.body[0].description).to.equal(filme.description);
        expect(response.body[0].durationInMinutes).to.equal(
          filme.durationInMinutes
        );
      }
    );
  });

  it("Deve ser possível pesquisar um filme com letras minúsculas", () => {
    cy.buscarFilmeResponseCompleto(filme.title.toLowerCase()).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.above(0);
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].releaseYear).to.be.an("number");
        expect(response.body[0].title).to.be.an("string");
        expect(response.body[0].genre).to.be.an("string");
        expect(response.body[0].description).to.be.an("string");
        expect(response.body[0].durationInMinutes).to.be.an("number");

        expect(response.body[0].id).to.equal(filme.id);
        expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
        expect(response.body[0].title).to.equal(filme.title);
        expect(response.body[0].genre).to.equal(filme.genre);
        expect(response.body[0].description).to.equal(filme.description);
        expect(response.body[0].durationInMinutes).to.equal(
          filme.durationInMinutes
        );
      }
    );
  });

  it("Deve ser possível pesquisar um filme com letras maiúsculas e minúsculas misturadas", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0].toUpperCase()} ${tituloSplit[1].toLowerCase()} ${tituloSplit[2].toUpperCase()} ${tituloSplit[3].toLowerCase()}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");

      expect(response.body[0].id).to.equal(filme.id);
      expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
      expect(response.body[0].title).to.equal(filme.title);
      expect(response.body[0].genre).to.equal(filme.genre);
      expect(response.body[0].description).to.equal(filme.description);
      expect(response.body[0].durationInMinutes).to.equal(
        filme.durationInMinutes
      );
    });
  });

  it("Não deve ser possível pesquisar um filme com título inexistente", () => {
    const tituloNovo = faker.lorem.words(10);
    cy.buscarFilmeResponseCompleto(tituloNovo).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.empty;
    });
  });

  it("Não Deve ser possível pesquisar um filme que contenha caracteres especiais no título", () => {
    const tituloNovo = `${filme.title}%`;
    cy.buscarFilmeResponseCompleto(tituloNovo).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.empty;
    });
  });

  it("Não Deve ser possível pesquisar um filme com espaços extras no título", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0].toUpperCase()}       ${tituloSplit[1].toLowerCase()}      ${tituloSplit[2].toUpperCase()}       ${tituloSplit[3].toLowerCase()}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.empty;
    });
  });

  it("Não Deve ser possível pesquisar um filme com espaços extras no título", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0].toUpperCase()}       ${tituloSplit[1].toLowerCase()}      ${tituloSplit[2].toUpperCase()}       ${tituloSplit[3].toLowerCase()}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.empty;
    });
  });

  it("Deve ser possível visualizar a descrição contida no súmario do filme encontrado", () => {
    const tituloNovo = `${filme.title}`;
    cy.buscarFilmeResponseCompleto(tituloNovo).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");

      expect(response.body[0].id).to.equal(filme.id);
      expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
      expect(response.body[0].title).to.equal(filme.title);
      expect(response.body[0].genre).to.equal(filme.genre);
      expect(response.body[0].description).to.equal(filme.description);
      expect(response.body[0].durationInMinutes).to.equal(
        filme.durationInMinutes
      );
    });
  });

  it("Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes", () => {
    cy.buscarFilmeResponseCompleto(filme.title).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");

      expect(response.body[0].id).to.equal(filme.id);
      expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
      expect(response.body[0].title).to.equal(filme.title);
      expect(response.body[0].genre).to.equal(filme.genre);
      expect(response.body[0].description).to.equal(filme.description);
      expect(response.body[0].durationInMinutes).to.equal(
        filme.durationInMinutes
      );
    });
  });
  it("Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes", () => {
    cy.buscarFilmeResponseCompleto(filme.title).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.statusText).to.equal("OK");
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.length.above(0);
      expect(response.body[0].id).to.be.an("number");
      expect(response.body[0].releaseYear).to.be.an("number");
      expect(response.body[0].title).to.be.an("string");
      expect(response.body[0].genre).to.be.an("string");
      expect(response.body[0].description).to.be.an("string");
      expect(response.body[0].durationInMinutes).to.be.an("number");

      expect(response.body[0].id).to.equal(filme.id);
      expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
      expect(response.body[0].title).to.equal(filme.title);
      expect(response.body[0].genre).to.equal(filme.genre);
      expect(response.body[0].description).to.equal(filme.description);
      expect(response.body[0].durationInMinutes).to.equal(
        filme.durationInMinutes
      );
    });
  });

  it("Deve ser possível um usuário comum realizar uma pesquisa no catálogo de filmes", () => {
    cy.buscarFilmeResponseCompleto(filme.title, usuarioComum.token).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.above(0);
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].releaseYear).to.be.an("number");
        expect(response.body[0].title).to.be.an("string");
        expect(response.body[0].genre).to.be.an("string");
        expect(response.body[0].description).to.be.an("string");
        expect(response.body[0].durationInMinutes).to.be.an("number");

        expect(response.body[0].id).to.equal(filme.id);
        expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
        expect(response.body[0].title).to.equal(filme.title);
        expect(response.body[0].genre).to.equal(filme.genre);
        expect(response.body[0].description).to.equal(filme.description);
        expect(response.body[0].durationInMinutes).to.equal(
          filme.durationInMinutes
        );
      }
    );
  });

  it("Deve ser possível um usuário crítico  realizar uma pesquisa no catálogo de filmes", () => {
    cy.buscarFilmeResponseCompleto(filme.title, usuarioCritico.token).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.above(0);
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].releaseYear).to.be.an("number");
        expect(response.body[0].title).to.be.an("string");
        expect(response.body[0].genre).to.be.an("string");
        expect(response.body[0].description).to.be.an("string");
        expect(response.body[0].durationInMinutes).to.be.an("number");

        expect(response.body[0].id).to.equal(filme.id);
        expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
        expect(response.body[0].title).to.equal(filme.title);
        expect(response.body[0].genre).to.equal(filme.genre);
        expect(response.body[0].description).to.equal(filme.description);
        expect(response.body[0].durationInMinutes).to.equal(
          filme.durationInMinutes
        );
      }
    );
  });

  it("Deve ser possível um usuário administrador realizar uma pesquisa no catálogo de filmes", () => {
    cy.buscarFilmeResponseCompleto(filme.title, usuarioAdmin.token).then(
      (response) => {
        expect(response.status).to.equal(200);
        expect(response.statusText).to.equal("OK");
        expect(response.body).to.be.an("array");
        expect(response.body).to.have.length.above(0);
        expect(response.body[0].id).to.be.an("number");
        expect(response.body[0].releaseYear).to.be.an("number");
        expect(response.body[0].title).to.be.an("string");
        expect(response.body[0].genre).to.be.an("string");
        expect(response.body[0].description).to.be.an("string");
        expect(response.body[0].durationInMinutes).to.be.an("number");

        expect(response.body[0].id).to.equal(filme.id);
        expect(response.body[0].releaseYear).to.equal(filme.releaseYear);
        expect(response.body[0].title).to.equal(filme.title);
        expect(response.body[0].genre).to.equal(filme.genre);
        expect(response.body[0].description).to.equal(filme.description);
        expect(response.body[0].durationInMinutes).to.equal(
          filme.durationInMinutes
        );
      }
    );
  });
});
