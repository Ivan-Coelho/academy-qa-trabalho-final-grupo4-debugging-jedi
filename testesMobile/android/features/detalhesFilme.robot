*** Settings ***

Resource    ../base.robot

Test Setup        Abrir App
Test Teardown     Teardown

*** Test Cases ***
CT 01- usuário não logado deve conseguir acessar os detalhes dos filmes registrados no catálogo
    Dado que usuario acessa o APP
    Quando acessa a página de detalhes de um filme
    Então usuário conseguirá ver a página de detalhes do filme
    
CT 02- usuário logado pode consultar os detalhes dos filmes registrados no catálogo
    Dado que usuario acessa o APP
    Quando acessa a página de detalhes de um filme
    Então usuário conseguirá ver a página de detalhes do filme

CT 03- A página de detalhes do filme deve conter um totalizador das avaliações de audiência e das avaliações de críticos
    Dado que usuario acessa o APP
    Quando acessa a página de detalhes de um filme
    Então o usuário conseguirá visualizar um totalizador das avaliações

CT 04- A página de detalhes do filme deve conter a opção para avaliar o filme se for acessada por um usuário logado
    Dado que usuário logado acessa o aplicativo
    Quando acessa a página de detalhes de um filme
    Então será permitido criar uma avaliação para o filme 

CT 05- A página de detalhes do filme deve conter todas as avaliações registradas para o filme
    Dado que usuario acessa o APP
    Quando acessa a página de detalhes de um filme
    Então o usuário conseguirá visualizar todas as avaliações registradas para o filme
 
CT 06- Deve ser possível consultar um filme especifico
    Dado que usuario acessa o APP
    E que tem um filme previamente cadastrado
    Quando acessa o filme especifico
    Então usuário conseguirá ver a página de detalhes do filme especifico
