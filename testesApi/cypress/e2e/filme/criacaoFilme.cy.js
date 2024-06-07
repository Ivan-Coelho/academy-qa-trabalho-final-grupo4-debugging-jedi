
describe("Criação de filme", function () {

    
    describe("Cadastro de filme como usuario adminstrador", function () {
        before(function () {
            cy.criarUsuarioAdmin().then(function () {});
          });

        it("Usuário administrador cadastra um filme com dados válidos", function () {
            cy.fixture("bodyFilme.json").then(function (dadosFilme) {
            cy.request({
                method: "POST",
                url: "movies",
                body: dadosFilme,
                headers: { Authorization: "Bearer " + tokenUsuario },
            }).then(function (cadastrarFilme) {
            expect(cadastrarFilme.status).to.equal(201);
            filmeCriado = dadosFilme.title;
                });
            });
        });
    });
});