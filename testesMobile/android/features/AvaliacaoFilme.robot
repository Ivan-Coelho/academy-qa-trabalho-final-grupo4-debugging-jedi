*** Settings ***

Resource    ../base.robot


Test Setup        Abrir App
Test Teardown     Teardown

*** Test Cases ***

CT001 - teste 
    cadastrar usuario na API
    Login usuario pela API    ${EMAIL_API}
    Evoluir para administrador    ${TOKEN}
    Criar um filme    ${TOKEN}
    # Deletar um filme    ${TOKEN}    ${ID_FILME}

CT001 - Não deve ser possível usuário não cadastrado avaliar um filme
    Existe um filme cadastrado
    Dado que o usuario acessa a tela inicial
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                      ${SCORE_5}
    E escreve um comentario                         Melhor filme do mundo
    E salva a Avaliação
    Então o sistemar retorna uma mensagem           ${ERRO_LOGIN}    Faça login e tente novamente.

CT002 - Deve ser possível um usuário cadastrado avaliar um filme
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                      ${SCORE_5}
    E escreve um comentario                         Melhor filme do mundo
    E salva a Avaliação
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT003 - Deve ser possível um usuário critico avaliar um filme
    Dado que usuário critico acessa o aplicativo
    E encontra um filme de interesse                 ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                       ${SCORE_5}
    E escreve um comentario                          Melhor filme do mundo
    E salva a Avaliação
    Então o sistemar retorna uma mensagem            ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação