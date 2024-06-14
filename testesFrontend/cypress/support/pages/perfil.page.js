export default class PerfilPage{

    linkInicio = '.logo'
    linkPaginaPerfil = ('a[href="/profile"]');
    linkGerenciarConta = ('[href="/account"]');
    linkLogout = ('[href="/logout"]');

    inputFilmes = ('[placeholder="Buscar filmes"]');
    buttonPesquisarFilme = ('.search-button');

    avaliacoesUsuario = ".profile-main-container > :nth-child(2)";
    reviewCard1 = ":nth-child(1) > .review-card-header"
    reviewCard2 = ":nth-child(2) > .review-card-header"
    scoreFilme = ".stars";

    clickButtonGerenciarConta(){
        cy.get(this.linkGerenciarConta).click();
    }

    clickButtonlogout(){
        cy.get(this.linkLogout).click();
    }

    clickReviewCard1(){
        cy.get(this.reviewCard1).click();
    }

    clickReviewCard2(){
        cy.get(this.reviewCard2).click();
    }
 

}