import { faker } from "@faker-js/faker";

describe("Pesquisar Filme", () => {
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

    // it("Deve ser possível pesquisar um filme com erro de digitação", () => {
  //   const tituloSplit = filme.title.split(" ");
  //   const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}S`;
  //   cy.buscarFilme(tituloParcial).then((response) => {
  //     expect(response).to.equal(filme.id);
  //   });
  // });

  it("Deve ser possível pesquisar um filme com letras maiúsculas", () => {
    cy.buscarFilmeResponseCompleto(filme.title.toUpperCase()).then((response) => {
      expect(response.body[0].id).to.equal(filme.id);
    });
  });

  it("Deve ser possível pesquisar um filme com letras minúsculas", () => {
    cy.buscarFilmeResponseCompleto(filme.title.toLowerCase()).then((response) => {
      expect(response.body[0].id).to.equal(filme.id);
    });
  });

  it("Deve ser possível pesquisar um filme com letras maiúsculas e minúsculas misturadas", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0].toUpperCase()} ${tituloSplit[1].toLowerCase()} ${tituloSplit[2].toUpperCase()} ${tituloSplit[3].toLowerCase()}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.body[0].id).to.equal(filme.id);
    });
  });

  it("Não deve ser possível pesquisar um filme com título inexistente", () => {
    const tituloNovo = faker.lorem.words(10)
    cy.buscarFilmeResponseCompleto(tituloNovo).then((response) => {
      expect(response.status).to.equal(200)
      expect(response.body).to.empty
      
    });
  });

  it("Deve ser possível pesquisar um filme que contenha caracteres especiais no título", () => {
    const tituloNovo = `${filme.title}%`
    cy.buscarFilmeResponseCompleto(tituloNovo).then((response) => {
      console.log(response)
      expect(response.status).to.equal(200)
      expect(response.body).to.empty
      
    });
  });


  it("Não Deve ser possível pesquisar um filme com espaços extras no título", () => {
    const tituloSplit = filme.title.split(" ");
    const tituloParcial = `${tituloSplit[0].toUpperCase()}       ${tituloSplit[1].toLowerCase()}      ${tituloSplit[2].toUpperCase()}       ${tituloSplit[3].toLowerCase()}`;
    cy.buscarFilmeResponseCompleto(tituloParcial).then((response) => {
      expect(response.body).to.empty;
    });
  });

  it("Deve ser possível visualizar a descrição contida no súmario do filme encontrado", () => {
    const tituloNovo = `${filme.title}`;
    cy.buscarFilmeResponseCompleto(tituloNovo).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body[0].description).to.equal(filme.description);
    });
  });

  it("Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes", () => {
    cy.buscarFilmeResponseCompleto(filme.title).then((response) => {
      expect(response.body[0].id).to.equal(filme.id);
    });
  });

  

  it("Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes", () => {});

  it("Deve ser possível um usuário comum realizar uma pesquisa no catálogo de filmes", () => {});

  it("Deve ser possível um usuário crítico  realizar uma pesquisa no catálogo de filmes", () => {});

  it("Deve ser possível um usuário administrador realizar uma pesquisa no catálogo de filmes", () => {});
});
