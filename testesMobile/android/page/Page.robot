*** Settings ***

Resource   ../base.robot
Resource   ../pages/registrarPage.robot
Library    XML
Library    AppiumLibrary
Library    FakerLibrary

*** Variables ***
${HOME}			                 xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		                 xpath=//android.widget.Button[@content-desc="Open navigation menu"] 
${RARO_MDB}                      xpath=//android.view.View[@content-desc="Raromdb"]

${REGISTRE-SE}                   xpath=//android.view.View[@content-desc="Registre-se"]                


${NOME} 		                 xpath=//android.widget.ImageView/android.widget.EditText[1]
${EMAIL}                         xpath=//android.widget.ImageView/android.widget.EditText[2]
${SENHA}		                 xpath=//android.widget.ImageView/android.widget.EditText[3]
${CONFIRMAR_SENHA}               xpath=//android.widget.ImageView/android.widget.EditText[4]
${REGISTRAR}                     xpath=//android.widget.Button[@content-desc="Registrar"]

${MENSAGEM_CADASTRO}             xpath=//android.view.View[contains(@content-desc,"Cadastro realizado")]

${MENSAGEM_INFORME_NOME}	     xpath=//android.view.View[@content-desc="Informe o nome."]
${MENSAGEM_INFORME_EMAIL}	     xpath=//android.view.View[@content-desc="Informe o e-mail."]
${MENSAGEM_INFORME_SENHA}	     xpath=//android.view.View[@content-desc="Informe uma senha."]
${MENSAGEM_CONFIRME_SENHA}       xpath=//android.view.View[@content-desc="Confirme a senha."]
${MENSAGEM_SENHAS_DIFERENTES}    xpath=//android.view.View[@content-desc="As senhas não coincidem."]


${MENSAGEM_EMAIL_INVALIDO}       xpath=//android.view.View[@content-desc="Informe um e-mail válido."]
${MENSAGEM_EMAIL_CADASTRADO}     xpath=//android.view.View[@content-desc="E-mail já cadastrado. Utilize outro e-mail."]

${MENSAGEM_ERRO}                 xpath=//android.view.View[@content-desc="Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde."]

${SAIR}                          path=//android.view.View[@content-desc="Sair"]



*** Keywords ***

Dado que o usuario acessa a tela inicial
    Wait Until Element Is Visible   ${HOME}    10
    Element Should Be Visible   ${HOME}   

Entao deve visualizar a home
    Espera o elemento e verifica o atributo  ${HOME}    content-desc    Home


  