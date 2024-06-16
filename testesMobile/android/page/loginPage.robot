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

*** Keywords ***
Fazer login aplicativo
    [Arguments]    ${userEmail}    ${userPassword}
    Inserir dados    ${INPUTEMAIL}    ${userEmail}
    Inserir dados    ${inputSenha}    ${userPassword}
    Espera elemento e clica    ${BTN_LOGIN}

E acessa a opção de login
    Espera elemento e clica    ${LOGIN}

Então será possivel acessar a tela de login
    Espera elemento está visivel    ${INPUTEMAIL}
    Espera elemento está visivel    ${inputSenha}

Dado que o usuário acessa a tela de login
    Acessa login

Quando informa as credenciais cadastradas
    ${usuarioCriado}=    Criar usuário API
    Fazer login aplicativo    ${usuarioCriado}[email]    ${usuarioCriado}[password]
    Set Global Variable    ${usuarioLogado}    ${usuarioCriado}

Então usuário deve autenticar-se com sucesso
    Espera elemento está visivel    ${loginRealizado}

Quando informa as credenciais exceto campo Email
    Inserir dados    ${inputSenha}    123456

E acessa funcionalidade login
    Espera elemento e clica    ${logar}

Quando informa as credenciais exceto campo Senha
    Inserir dados    ${INPUTEMAIL}    debugging@strikesback.com

Então deve alertar no formulário o campo Senha como obrigatória
    Espera elemento está visivel    ${ALERTA_SENHA}

Quando não informa Email e Senha
    Espera elemento e clica    ${INPUTEMAIL}
    Espera elemento e clica    ${inputSenha}

Então deve alertar no formulário os campos obrigatórios de login
    Então deve alertar no formulário o campo Email como obrigatório
    Então deve alertar no formulário o campo Senha como obrigatória

Quando informa as credenciais utilizando email não cadastrado
    Inserir dados    ${INPUTEMAIL}    blablablabla@gblas.com
    Inserir dados    ${inputSenha}    12345678

Então o site deve exibir alerta de usuário ou senha inválidos
    Espera elemento está visivel    ${alertaLogin}

Quando informa as credenciais utilizando senha incorreta
    Quando informa as credenciais utilizando email não cadastrado

Quando o usuario abrir o menu

    Element Should Be Visible    ${BTN_MENU}
    Wait Until Page Contains Element        ${CARD_FILME}
    Clicar no Elemento               ${BTN_MENU}

*** Keywords ***
Dado que usuario acessa o APP
    Abrir App
Quando acessa a página de Login
    
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