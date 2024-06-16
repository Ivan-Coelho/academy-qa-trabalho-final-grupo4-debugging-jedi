*** Settings ***

Resource    ../../base.robot
Library    FakerLibrary


*** Variables ***
${HOME}			      xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		      xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${INPUTEMAIL}         xpath=//android.widget.ImageView/android.widget.EditText[1]
${INPUTSENHA}         xpath=//android.widget.ImageView/android.widget.EditText[2]
${BTN_LOGIN}		  xpath=//android.widget.Button[@content-desc="Login"]
${CAMPO_LOGIN}		  xpath=//android.view.View[@content-desc="Login"]
${LOGADO}             ${None}
${LOGINSUCESSO}       xpath=//android.view.View[@content-desc="Login realizado!"]
${ALERTALOGIN}        xpath=//android.view.View[@content-desc="Usuário ou senha inválidos."]
${ALERTA_EMAIL}       xpath=//android.view.View[@content-desc="Informe o e-mail."]
${ALERTA_SENHA}       xpath=//android.view.View[@content-desc="Informe uma senha."]

*** Keywords ***
Fazer login aplicativo
    [Arguments]    ${userEmail}    ${userPassword}
    Clica no elemento e insere texto    ${INPUTEMAIL}    ${userEmail}
    Clica no elemento e insere texto    ${INPUTSENHA}    ${userPassword}
    Espera o elemento e clica no elemento    ${BTN_LOGIN}

E acessa a opção de login
    Espera o elemento e clica no elemento    ${CAMPO_LOGIN}

Então será possivel acessar a tela de login
    Espera se elemento está visivel    ${INPUTEMAIL}
    Espera se elemento está visivel    ${INPUTSENHA}

Dado que o usuário acessa a tela de login
    Acessa login

Quando informa as credenciais cadastradas
    ${usuarioCriado}=    Criar usuário API
    Fazer login aplicativo    ${usuarioCriado}[email]    ${usuarioCriado}[password]
    Set Global Variable    ${usuarioLogado}    ${usuarioCriado}

Então usuário deve logar com sucesso
    Espera se elemento está visivel      ${loginRealizado}

Quando informa as credenciais exceto campo Email
    Clica no elemento e insere texto    ${INPUTSENHA}    123456

E clica em login
    Espera o elemento e clica no elemento    ${BTN_LOGIN}

Quando digita os campos de login exceto Senha
    Clica no elemento e insere texto    ${INPUTEMAIL}    debugging@strikesback.com

Então deve alertar no formulário o campo Senha como obrigatória
    Espera se elemento está visivel    ${ALERTA_SENHA}

Quando não preenche os campos de Email e Senha
    Espera o elemento e clica no elemento    ${INPUTEMAIL}
    Espera o elemento e clica no elemento    ${INPUTSENHA}

Então deve surgir um aviso de preenchimento de campos obrigatórios
    Espera se elemento está visivel    ${ALERTA_SENHA}
    Espera se elemento está visivel    ${ALERTA_EMAIL}

Quando preenche com um e-mail não cadastrado
    Clica no elemento e insere texto    ${INPUTEMAIL}    blablablabla@gblas.com
    Clica no elemento e insere texto    ${INPUTSENHA}    12345678

Então o site deve exibir alerta de usuário ou senha inválidos
    Espera se elemento está visivel    ${ALERTALOGIN}

Quando preenche com uma senha incorreta
    Quando preenche com um e-mail não cadastrado

Quando o usuario abrir o menu

    Element Should Be Visible    ${BTN_MENU}
    Wait Until Page Contains Element        ${CARD_FILME}
    Clicar no Elemento               ${BTN_MENU}

*** Keywords ***
Dado que usuario acessa o APP
    Abrir App

Dado que o usuario acessou a tela de Login
    
    Element Should Be Visible    ${BTN_MENU}
    Wait Until Page Contains Element        ${CARD_FILME}
    Clicar no Elemento               ${BTN_MENU}
    Element Should Be Visible    ${CAMPO_LOGIN}
    Clicar no Elemento               ${CAMPO_LOGIN}

E realiza o Login

    Espera o elemento e verifica o atributo ${BTN_LOGIN}   Login
    Wait Until Page Contains Element        ${INPUTEMAIL}
    Clica no elemento e insere texto        ${INPUTEMAIL}
    Clica no elemento e insere texto        ${INPUTSENHA}

Quando digita seus dados válidos
    Efetuar Login com Dados Registrados

Então deve surgir um aviso de preenchimento de e-mail obrigatório
    Espera se elemento está visivel    ${ALERTA_EMAIL}

Então deve surgir um aviso de preenchimento de senha obrigatório
    Espera se elemento está visivel    ${ALERTA_SENHA}