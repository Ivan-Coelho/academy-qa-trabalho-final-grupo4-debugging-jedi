export default class PerfilPage{

    linkInicio = '.logo'
    linkPaginaPerfil = ('a[href="/profile"]');
    linkGerenciarConta = ('[href="/account"]');
    linkLogout = ('[href="/logout"]');

    inputFilmes = ('[placeholder="Buscar filmes"]');
    buttonPesquisarFilme = ('.search-button');

    clickButtonGerenciarConta(){
        cy.get(this.linkGerenciarConta).click();
    }

    clickButtonlogout(){
        cy.get(this.linkLogout).click();
    }
 

}