describe("Excluir Usuários", () => {
  let usuario;
  let idFilme;
  let userAdmin;
  let nameFilm;

  before(function () {
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
      userAdmin = dadosAdmin;
      cy.fixture("filmes/bodyReview.json").as("filme");
      cy.cadastrarFilme(userAdmin.token).then(function (response) {
        nameFilm = response.body.name;
        idFilme = response.body.id;
        this.filme.id = idFilme;
      });
    });
  });

  beforeEach(() => {
    cy.criarUsuarioResponse().then((novo) => {
      usuario = novo;
      cy.login(usuario).then((conteudo) => {
        usuario.accessToken = conteudo.body.accessToken;
      });
    });
  });

  it("Um administrador deve poder excluir um usuário", () => {
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
      let tokenAdmin = dadosAdmin.token;
      cy.deletarUsuario(usuario.id, tokenAdmin);
    });
  });

  it("Um administrador deve poder excluir sua própria conta", () => {
    cy.criarUsuarioAdmin().then((dadosAdmin) => {
      const userAdmin = dadosAdmin;
      const tokenAdmin = dadosAdmin.token;
      cy.deletarUsuario(userAdmin.id, tokenAdmin).then((response) => {
        expect(response.status).to.equal(204);
      });
    });
  });

  it("Um usuário comum não deve poder excluir uma conta", () => {
    cy.request({
      method: "DELETE",
      url: "/users/" + usuario.id,
      headers: { Authorization: "Bearer " + usuario.tokenComum },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq("Access denied.");
      expect(response.body.error).to.be.eq("Unauthorized");
    });
  });

  it("Um usuário crítico não deve poder excluir uma conta", () => {
    cy.criarUsuarioCritico().then((dadosCritico) => {
      let token = dadosCritico.tokenCritico;
      cy.request({
        method: "DELETE",
        url: "/users/" + usuario.id,
        headers: { Authorization: "Bearer " + token },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.be.eq("Access denied.");
        expect(response.body.error).to.be.eq("Unauthorized");
      });
    });
  });

  it("Um usuário crítico não deve poder excluir sua própria conta", () => {
    cy.criarUsuarioCritico().then((dadosCritico) => {
      let token = dadosCritico.tokenCritico;
      cy.request({
        method: "DELETE",
        url: "/users/" + dadosCritico.id,
        headers: { Authorization: "Bearer " + token },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.be.eq("Access denied.");
        expect(response.body.error).to.be.eq("Unauthorized");
      });
    });
  });

  it("Não deve ser possível excluir uma conta sem estar logado", () => {
    cy.request({
      method: "DELETE",
      url: "/users/" + usuario.id,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq("Access denied.");
      expect(response.body.error).to.be.eq("Unauthorized");
    });
  });

  it("Não deve ser possível visualizar as avaliações de um filme feita por um usuário excluído", () => {
    cy.criarUsuarioAdmin()
      .then(function (dadosAdmin) {
        const userAdmin = dadosAdmin;
        const tokenAdmin = dadosAdmin.token;
        cy.criarReview(idFilme, tokenAdmin);
        cy.deletarUsuario(userAdmin.id, tokenAdmin).then;
      })
      .then(() => {
        cy.buscarFilmeResponseCompleto(nameFilm).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body.reviews).to.be.an("array");
          expect(response.body.reviews.length).to.equal(0);
        });
      });
  });
});
