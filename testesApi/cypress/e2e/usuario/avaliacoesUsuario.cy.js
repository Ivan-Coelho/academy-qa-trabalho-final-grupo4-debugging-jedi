describe("Consulta de avaliações do usuário", function () {
  describe("Consulta de Avaliações do Usuário Autenticado", function () {
    let idFilme;
    let userAdmin;
    let dadosReview1;
    let dadosFilme;
    before(function () {
      cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        userAdmin = dadosAdmin;
      });
    });

    before(function () {
      cy.fixture("filmes/bodyReview.json").as("filme");
      cy.cadastrarFilme(userAdmin.token).then(function (response) {
        idFilme = response.body.id;
        this.filme.id = idFilme;
        dadosFilme = response;
      });
    });

    after(function () {
      cy.deletarFilme(idFilme, userAdmin.token);
      cy.deletarUsuario(userAdmin.id, userAdmin.token);
    });

    it("Consulta de Avaliações por Usuário", function () {
      cy.criarReview(idFilme, userAdmin.token).then(function (response) {
        dadosReview1 = response;
        cy.request({
          method: "GET",
          url: "users/review/all",
          headers: { Authorization: "Bearer " + userAdmin.token },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body[0].movieId).to.equal(idFilme);
          expect(response.body[0].score).to.equal(dadosReview1.score);
        });
      });
    });

    it("Verificação de Avaliações Únicas por Filme", function () {
      let nota1 = 1;
      let nota2 = 5;
      cy.request({
        method: "POST",
        url: "users/review",
        body: {
          movieId: idFilme,
          score: nota1,
          reviewText: "comentario",
        },
        headers: { Authorization: "Bearer " + userAdmin.token },
      });
      cy.request({
        method: "POST",
        url: "users/review",
        body: {
          movieId: idFilme,
          score: nota2,
          reviewText: "comentario",
        },
        headers: { Authorization: "Bearer " + userAdmin.token },
      });
      cy.request({
        method: "GET",
        url: "users/review/all",
        headers: { Authorization: "Bearer " + userAdmin.token },
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body[0].movieId).to.equal(idFilme);
        expect(response.body[0].score).to.equal(nota2);
        expect(nota1).to.not.equal(nota2);
        expect(response.body.length).to.equal(1);
      });
    });
    it("Visualização de Detalhes das Avaliações", function () {
      cy.request({
        method: "GET",
        url: "users/review/all",
        headers: { Authorization: "Bearer " + userAdmin.token },
      }).then(function (response) {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.of.at.least(1);
        expect(response.body[0].id).to.be.a("number");
        expect(response.body[0].movieId).to.be.equal(idFilme);
        expect(response.body[0].movieTitle).to.equal(dadosFilme.body.title);
      });
    });

    it.only("A consulta de avaliações do filme usuário deve visualizar avaliaçoes marcadas conforme seu perfil usado na avaliação", function () {
      cy.criarReview(idFilme, userAdmin.token).then(function (response) {
        dadosReview1 = response;
        cy.request({
          method: "GET",
          url: "users/review/all",
          headers: { Authorization: "Bearer " + userAdmin.token },
        }).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.length.of.at.least(1);
          expect(response.body[0].reviewType).to.be.equal(1);
        });
      });
    });

    it("Consulta de Avaliações por Usuário sem avaliação registrada", function () {
      let userCritico;
      cy.criarUsuarioCritico().then(function (response) {
        userCritico = response;

        cy.listarReview(userCritico.token).then(function (response) {
          expect(response.status).to.equal(200);
          expect(response.body).to.have.length.of.at.least(0);
        });
      });
    });
  });
  describe("Consulta de Avaliações do Usuário não Autenticado", function () {
    it("Nao deve ser possivel que um usuário não autenticado acesse as avaliações", function () {
      cy.request({
        method: "GET",
        url: "users/review/all",

        failOnStatusCode: false,
      }).then(function (response) {
        expect(response.status).to.equal(401);
        expect(response.body.error).to.include("Unauthorized");
        expect(response.body.message).to.include("Access denied.");
      });
    });
  });
});
