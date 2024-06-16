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
    Cria uma review    ${TOKEN}
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
    Existe um filme cadastrado
    Dado que usuário critico acessa o aplicativo
    E encontra um filme de interesse                 ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                       ${SCORE_5}
    E escreve um comentario                          Melhor filme do mundo
    E salva a Avaliação
    Então o sistemar retorna uma mensagem            ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT004 - Deve ser possível um usuário cadastrado avaliar um filme sem informar um comentario
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                      ${SCORE_5}   
    E salva a Avaliação
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT005 - Não deve ser possível usuário avaliar um filme sem informar uma nota
    Existe um filme cadastrado
    Dado que o usuario acessa a tela inicial
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme    
    E escreve um comentario                         Melhor filme do mundo
    E salva a Avaliação
    Então o sistemar retorna uma mensagem           ${ERRO_REVIEW}    Não foi possível adicionar sua review.

CT006 - Não deve ser possível usuário avaliar um filme com comentário de mais de 500 caracteres
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                      ${SCORE_5}
    E escreve um comentario                         Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. BOOM
    E salva a Avaliação
    Então o sistemar retorna uma mensagem           ${ERRO_REVIEW}    Não foi possível adicionar sua review.
    
CT007 - Deve ser possível usuário avaliar um filme com comentário de até 500 caracteres
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                      ${SCORE_5}
    E escreve um comentario                         Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. BOOM
    E salva a Avaliação
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT008 - Deve ser possível usuário atualizar a sua avaliação
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    E encontra um filme de interesse                ${FILME_ENCONTRADO}
    Quando acessa o filme
    E acessa a tela de avaliaçao do filme
    E da uma nota para o filme                      ${SCORE_3}
    E escreve um comentario                         legal
    E salva a Avaliação
    Press Keycode    4
    E da uma nota para o filme                      ${SCORE_5}
    E escreve um comentario                         Melhor filme do mundo
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação
