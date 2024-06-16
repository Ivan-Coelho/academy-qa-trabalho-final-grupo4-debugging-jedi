*** Settings ***

Resource    ../base.robot
Resource    ../page/loginPage.robot
Library    FakerLibrary

*** Variables ***

${HOME}			                 xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		                 xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${BTN_LOGIN}		             xpath=//android.widget.Button[@content-desc="Login"]
${CAMPO_LOGIN}		             xpath=//android.view.View[@content-desc="Login"]
	
${IMPUT_EMAIL}		             xpath=//android.widget.ImageView/android.widget.EditText[1]
${IMPUT_SENHA}		             xpath=//android.widget.ImageView/android.widget.EditText[2]
${emailR}	


*** Keywords ***


Dado que usuario acessa o site
    Abrir App
Quando acessa a página de Login
    
    Element Should Be Visible               ${BTN_MENU}
    Wait Until Page Contains Element        ${CARD_FILME}
    Clicar no Elemento                      ${BTN_MENU}
    Sleep    1
    Element Should Be Visible               ${CAMPO_LOGIN}
    Clicar no Elemento                      ${CAMPO_LOGIN}

# E realiza o Login

    # Espera o elemento e verifica o atributo${BTN_LOGIN}        Login
    # Wait Until Page Contains Element            ${IMPUT_EMAIL}
    # Clica no elemento e insere texto            ${IMPUT_EMAIL}
    # Clica no elemento e insere texto            ${IMPUT_SENHA}
