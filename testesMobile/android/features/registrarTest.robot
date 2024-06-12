*** Settings ***
Resource    ../utils/config.robot
Resource    ../utils/commons.robot
Resource    ../page/Page.robot


Test Setup        Abrir App
Test Teardown     Teardown


*** Test Cases ***

CT000 - Visitar pagina inicial
   Dado que o usuario acessa a tela inicial
   Entao deve visualizar a home


