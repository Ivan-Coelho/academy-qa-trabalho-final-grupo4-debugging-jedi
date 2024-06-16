*** Settings ***
Resource    ../base.robot
Resource    ../page/loginPage.robot


Test Setup        Abrir App
Test Teardown     Teardown

*** Test Cases ***
CT 01- usuário não logado deve conseguir acessar os detalhes dos filmes registrados no catálogo
    Dado que usuario acessa o site
    Quando acessa a página de Login
    E realiza o Login