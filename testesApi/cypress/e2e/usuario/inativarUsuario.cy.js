describe("Inativar Usuários", () => {
  let usuario;
  let idFilme;
  let userAdmin;
  let nameFilm;

  before(function () {
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
      userAdmin = dadosAdmin;
      userAdmin.accessToken = dadosAdmin.tokenAdmin;
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

  it("Um usuário comum deve conseguir desativar sua conta", () => {
    cy.inativarConta(usuario.accessToken).then((response) => {
      expect(response.status).to.equal(204);
      expect(response.body).to.equal("");
    });
  });

  it("Um administrador deve conseguir desativar uma conta", () => {
    cy.inativarConta(usuario.accessToken).then((response) => {
      expect(response.status).to.equal(204);
      expect(response.body).to.equal("");
    });
  });

  it("Um crítico deve conseguir desativar sua conta", () => {
    cy.criarUsuarioCritico(usuario.accessToken).then(function () {
      cy.inativarConta(usuario.accessToken).then((response) => {
        expect(response.status).to.equal(204);
        expect(response.body).to.equal("");
      });
    });
  });

  it("Não deve ser possível inativar uma conta sem estar logado", () => {
    cy.request({
      method: "PATCH",
      url: "/users/inactivate",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.equal(401);
      expect(response.body.message).to.be.eq("Access denied.");
      expect(response.body.error).to.be.eq("Unauthorized");
    });
  });
});
