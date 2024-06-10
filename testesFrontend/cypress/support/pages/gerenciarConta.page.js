export default class InicialPage{
    linkPaginaRegistro = '[href="/register"]';
    linkPaginaLogin = '[href="/login"]';
    linkInicio = '.logo'
    linkPerfilPage = ('a[href="/profile"]');

    inputFilmes = '[placeholder="Buscar filmes"]';
    buttonPesquisarFilme = ('.search-button');

    clickPaginaRegistro(){
        cy.get(this.linkPaginaRegistro).click();
    }

    clickPaginaLogin(){
        cy.get(this.linkPaginaLogin).click();
    }

    clickPaginaPerfil(){
        cy.get(this.linkPerfilPage).click();
    }

    typeFilme(filme){
        cy.get(this.inputFilmes).type(filme);
    }

    clickPesquisaFilme(){
        cy.get(this.buttonPesquisarFilme).click();
    }

}