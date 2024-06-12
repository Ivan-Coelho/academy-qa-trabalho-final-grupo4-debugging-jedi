export default class DetalhesFilmePage{

    posterFilme = '.w-full'
    nomeFilme = '.movie-details-title'

    textoAudiencia = '.movie-score-info > :nth-child(1) > :nth-child(1)'
    numeroAudiencia = '.movie-score-info > :nth-child(1) > :nth-child(3)'
    textoCritica = '.movie-score-info > :nth-child(2) > :nth-child(1)'
    numeroCritica = '.movie-score-info > :nth-child(2) > :nth-child(3)'

    totalizadorAudienciaV = '.movie-score-info > :nth-child(1) > div'
    totalizadorAudiencia = '.movie-score-info > :nth-child(1) > div > .filled'
    totalizadorAudienciaQ = '.movie-score-info > :nth-child(1) > div > .filled-half'
    estrelaAudiencia1 = '.movie-score-info > :nth-child(1) > div > :nth-child(1)'
    estrelaAudiencia2 = '.movie-score-info > :nth-child(1) > div > :nth-child(2)'
    estrelaAudiencia3 = '.movie-score-info > :nth-child(1) > div > :nth-child(3)'
    estrelaAudiencia4 = '.movie-score-info > :nth-child(1) > div > :nth-child(4)'
    estrelaAudiencia5 = '.movie-score-info > :nth-child(1) > div > :nth-child(5)'

    totalizadorCriticoV ='.movie-score-info > :nth-child(2) > div'
    totalizadorCritico ='.movie-score-info > :nth-child(2) > div > .filled'
    totalizadorCriticoQ = '.movie-score-info > :nth-child(2) > div .filled-half'
    estrelaCritica1 = '.movie-score-info > :nth-child(2) > div > :nth-child(1)'
    estrelaCritica2 = '.movie-score-info > :nth-child(2) > div > :nth-child(2)'
    estrelaCritica3 = '.movie-score-info > :nth-child(2) > div > :nth-child(3)'
    estrelaCritica4 = '.movie-score-info > :nth-child(2) > div > :nth-child(4)'
    estrelaCritica5 = '.movie-score-info > :nth-child(2) > div > :nth-child(5)'

    descricaoFilme = '.movie-detail-description'
    anoLancamento = ':nth-child(4) > span'
    duracaoFilme = ':nth-child(5) > span'    
    generoFilme = ':nth-child(6) > span'

    campoReview = '.rate-movie'
    textoAvalieFilme ='.movie-details-container > :nth-child(2)'
    inputReview = 'textarea'
    inputReview2 = '[placeholder="O que você acha deste filme ?"]'
    buttonLoginAva = '.rate-movie > a'
    buttonEnviar = '.rate-movie > button'

    estrelaAvaliacao = '.review-form-star.false'
    estrelaAvaliacaoD = '.review-form-star.star-disabled'
    estrelaAvaliacao1 = '.stars > :nth-child(1)'
    estrelaAvaliacao2 = '.stars > :nth-child(2)'
    
    textoAvaliacaoUsuarios = '.user-reviews-section > h2'    
    
    totalReviewUsuarios = '.user-review-info'
    reviewUsuarios = '.user-review-card'
    notaUsuario = 'star-container-reviewcard'
    nomeUsuario = 'h3.user-reviecard-info'
    comentarioUsuario = 'p.user-reviecard-info'

    dataReview = ".user-review-card label"

    clickButtonLogin(){
        cy.get(this.buttonLoginAva).click();
    }

    clickButtonSalvar(){
        cy.get(this.clickButtonSalvar).click();
    }

    typeReview(review){
        cy.get(this.inputReview).clear().type(review)
    }

}