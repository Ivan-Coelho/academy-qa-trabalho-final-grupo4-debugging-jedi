*** Settings ***

Resource    ../base.robot

Test Setup        Abrir App
Test Teardown     Teardown

*** Test Cases ***
CT 01- usuário não logado deve conseguir acessar os detalhes dos filmes registrados no catálogo
    Dado que usuario não cadastrado acessa o site 
    Quando acessa a página de detalhes de um filme
    Então usuário conseguirá ver a página de detalhes do filme
    
CT 02- usuário logado pode consultar os detalhes dos filmes registrados no catálogo
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    Então usuário conseguirá ver a página de detalhes do filme

 