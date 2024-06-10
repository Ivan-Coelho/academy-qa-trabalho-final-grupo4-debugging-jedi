export default class DetalhesFilmePage{

    posterFilme = '.w-full'
    nomeFilme = '.movie-details-title'

    textoAudiencia = '.movie-score-info > :nth-child(1) > :nth-child(1)'
    numeroAudiencia = '.movie-score-info > :nth-child(1) > :nth-child(3)'
    textoCritica = '.movie-score-info > :nth-child(2) > :nth-child(1)'
    numeroCritica = '.movie-score-info > :nth-child(2) > :nth-child(3)'

    estrelaAudiencia1 = '.movie-score-info > :nth-child(1) > div > :nth-child(1)'
    estrelaAudiencia2 ='.movie-score-info > :nth-child(1) > div > :nth-child(2)'

    estrelaCritica1 = '.movie-score-info > :nth-child(2) > div > :nth-child(1)'
    estrelaCritica2 = '.movie-score-info > :nth-child(2) > div > :nth-child(2)'

    descricaoFilme = '.movie-detail-description'
    anoLancamento = ':nth-child(4) > span'
    duracaoFilme = ':nth-child(5) > span'    
    generoFilme = ':nth-child(6) > span'

    textoAvalieFilme ='.movie-details-container > :nth-child(2)'
    inputReview = 'textarea'
    buttonLoginAva = '.rate-movie > a'

    estrelaAvaliacao1 = '.stars > :nth-child(1)'
    estrelaAvaliacao2 = '.stars > :nth-child(2)'

    textoAvaliacaoUsuarios = '.user-reviews-section > h2'

}