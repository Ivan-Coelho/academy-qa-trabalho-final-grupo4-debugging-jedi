*** Settings ***

Resource    ../base.robot


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
    Clear Text    ${elemento}
    Input Text     ${elemento}    ${texto}

Espera o elemento e verifica o atributo
    [Arguments]    ${elemento}    ${atributo}    ${valor_atributo}
    Wait Until Element Is Visible        ${elemento}    10
   AppiumLibrary. Element Attribute Should Match       ${elemento}    ${atributo}    ${valor_atributo}    regexp=true  

 Duplo Clique no Elemento
    [Arguments]    ${locator}
    ${element} =    Get Webelement    ${locator}
    Click Element    ${locator}
    Click Element    ${locator}

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
    Sleep    5
    Duplo Clique no Elemento    ${REGISTRAR}
    Set Global Variable    ${emailR}    ${email_random}
    Entao o usuario sera registrado

Efetuar Login com Dados Registrados  
    Wait Until Element Is Visible        ${HOME}    10
    Quando acessa a página de Login
    Wait Until Element Is Visible       ${CAMPO_LOGIN}          
    Clica no elemento e insere texto  ${IMPUT_EMAIL}   ${emailR}  
    Clica no elemento e insere texto    ${IMPUT_SENHA}   123456
    Click Element    ${BTN_LOGIN}
    Sleep    2
Swipe até o elemento visível
    [Arguments]    ${element_locator}    ${timeout}=5s
    ${status}    Run Keyword And Return Status    Element Should Be Visible    ${element_locator}    timeout=${timeout}
    WHILE    '${status}' == 'False'
        Swipe    500    1500    500    500
        ${status}    Run Keyword And Return Status    Element Should Be Visible    ${element_locator}    timeout=2s
    END

Efetua Login do usuário
    [Arguments]    ${email}
    Wait Until Element Is Visible        ${HOME}    10
    Quando acessa a página de Login
    # Wait Until Element Is Visible       ${CAMPO_LOGIN}          
    Clica no elemento e insere texto    ${IMPUT_EMAIL}   ${email}  
    Clica no elemento e insere texto    ${IMPUT_SENHA}   123456
    Click Element    ${BTN_LOGIN}
    Sleep    2

Verifica texto
    [Arguments]    ${elemento}    ${texto}
    ${contenDesc}=     AppiumLibrary.Get Element Attribute    ${elemento}    content-desc    
    Should Contain    ${contenDesc}    ${texto}

tira foto
    Capture Page Screenshot