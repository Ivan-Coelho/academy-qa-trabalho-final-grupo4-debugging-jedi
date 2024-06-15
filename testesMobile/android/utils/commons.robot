*** Settings ***

Resource    ../base.robot
Resource    ../page/loginPage.robot
Library    AppiumLibrary
Library    FakerLibrary

*** Variables ***
${emailR}

*** Keywords ***


Espera o elemento e clica no elemento
    [Arguments]    ${ELEMENTO} 
    Wait Until Element Is Visible   ${ELEMENTO}
    Click Element    ${ELEMENTO}

Clica no elemento e insere texto
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible    ${elemento}
    Click Element    ${elemento}
    Sleep    1
    Input Text     ${elemento}    ${texto}

Espera o elemento e verifica o atributo
    [Arguments]    ${elemento}    ${atributo}    ${valor_atributo}
    Wait Until Element Is Visible        ${elemento}    10
    Element Attribute Should Match       ${elemento}    ${atributo}    ${valor_atributo}    regexp=true  

 
Registrar Usuário
    Dado que o usuario acessa a tela inicial
    Entao deve visualizar a home
    Quando clica na opcao menu
    Wait Until Element Is Visible    ${REGISTRE-SE}    
    Click Element    ${REGISTRE-SE}
    
    Wait Until Element Is Visible        ${NOME}    10
    [Arguments]
    ${nome_random}    Name
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}    ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}   ${email_random}
    Clica no elemento e insere texto    ${SENHA}   123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Click Element    ${REGISTRAR}
    Set Global Variable    ${emailR}    ${email_random}
    Entao o usuario sera registrado

Efetuar Login com Dados Registrados  
    Wait Until Element Is Visible        ${HOME}    10
    Quando acessa a página de Login
    Wait Until Element Is Visible       ${CAMPO_LOGIN}          
    Clica no elemento e insere texto  ${IMPUT_EMAIL}   ${emailR}  
      
    Clica no elemento e insere texto    ${IMPUT_SENHA}   123456
    Click Element    ${BTN_LOGIN}