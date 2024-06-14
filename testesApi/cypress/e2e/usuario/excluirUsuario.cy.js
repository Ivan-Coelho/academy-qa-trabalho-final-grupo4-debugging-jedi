describe ("Excluir Usuarios", () => {
    let token;
    let filme;
    let usuario;
    let usuarioExcluido;

    beforeEach (() => {
        cy.criarUsuario().then((novoUsuario) =>{
            usuario = novoUsuario;
        })
    });

    it ("Um administrador deve poder excluir um usuário", () => {

    });

    it ("Um administrador deve poder excluir sua própria conta", () => {

    });

    it ("Um usuário comum não deve poder excluir uma conta", () => {

    });

    it ("Um usuário crítico não deve poder excluir uma conta", () => {

    });

    it ("Um usuário crítico não deve poder excluir sua própria conta", () => {

    });

    it ("Não deve ser possível excluir uma conta sem estar logado", () => {

    });

    it ("Não deve ser possível visualizar as avaliações de um filme feita por um usuário excluído", () => {

    });
})