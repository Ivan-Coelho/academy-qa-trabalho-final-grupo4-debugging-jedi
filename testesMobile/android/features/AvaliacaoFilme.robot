*** Settings ***

Resource    ../base.robot


Test Setup        Abrir App
Test Teardown     Teardown

*** Test Cases ***

CT001 - Não deve ser possível usuário não cadastrado avaliar um filme
    Existe um filme cadastrado
    Dado que o usuario acessa a tela inicial
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                               ${SCORE_5}       Melhor filme do mundo      
    Então o sistemar retorna uma mensagem           ${ERRO_LOGIN}    Faça login e tente novamente.

CT002 - Deve ser possível um usuário cadastrado avaliar um filme
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                               ${SCORE_3}           Melhor filme do mundo      
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT003 - Deve ser possível um usuário critico avaliar um filme
    Existe um filme cadastrado
    Dado que usuário critico acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                               ${SCORE_5}               Melhor filme do mundo      
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}        Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT004 - Deve ser possível um usuário cadastrado avaliar um filme sem informar um comentario
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                               ${SCORE_5}          ${EMPTY}
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT005 - Não deve ser possível usuário avaliar um filme sem informar uma nota
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme sem atribuir uma nota         Melhor filme do mundo     
    Então o sistemar retorna uma mensagem           ${ERRO_REVIEW}            Não foi possível adicionar sua review.

CT006 - Não deve ser possível usuário avaliar um filme com comentário de mais de 500 caracteres
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                              ${SCORE_5}                Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. BOOM
    Então o sistemar retorna uma mensagem          ${ERRO_REVIEW}            Não foi possível adicionar sua review.

CT007 - Deve ser possível usuário avaliar um filme com comentário de até 500 caracteres
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                             ${SCORE_5}             Star Wars é uma obra-prima cinematográfica que solidificou a saga como um fenômeno cultural. Lançado em 1980, o filme aprofunda a narrativa e os personagens, mostrando a luta desesperada da Aliança Rebelde contra o Império Galáctico. A revelação chocante de Darth Vader como pai de Luke Skywalker e o treinamento de Luke com Yoda são momentos icônicos. As cenas no planeta Hoth e na Cidade das Nuvens são visualmente deslumbrantes, e o desfecho sombrio deixa todos ansiosos pelo próximo capítulo. BOM
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!

CT008 - Deve ser possível usuário atualizar a sua avaliação de um filme
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    E acessa a tela de avaliaçao do filme
    E avalia um filme                               ${SCORE_3}    Filme legal     
    E atualiza a review                             ${SCORE_5}    Melhor filme do mundo    
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação

CT009 - Deve ser possível um usuário cadastrado avaliar um filme específico
    Existe um filme cadastrado
    Dado que usuário logado acessa o aplicativo
    E encontra um filme de interesse                ${FILME_ENCONTRADO}                          
    E acessa a tela de avaliaçao do filme
    E avalia um filme                               ${SCORE_5}           Melhor filme do mundo
    Então o sistemar retorna uma mensagem           ${SUCESSO_REVIEW}    Sua review foi adicionada!
    E será possível vizualizar a sua avaliação
