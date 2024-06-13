*** Settings ***

Resource   ../base.robot
Resource   ../page/Page.robot
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

Quando clica na opcao menu
    Espera o elemento e verifica o atributo    ${BTN_MENU}   content-desc    Open navigation menu
    Espera o elemento e clica no elemento      ${BTN_MENU}
   
E clica na opcao registrar-se
    Espera o elemento e verifica o atributo    ${REGISTRE-SE}    content-desc    Registre-se
    Click Element    ${REGISTRE-SE}

E insere os dados necessarios
    [Arguments]
    ${nome_random}    Name
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}    ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}   ${email_random}
    Clica no elemento e insere texto    ${SENHA}   123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Click Element    ${REGISTRAR}

Entao o usuario sera registrado
    Espera o elemento e verifica o atributo   ${MENSAGEM_CADASTRO}     content-desc    Cadastro realizado!    

E nao insere os dados
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}
E clica na opcao registrar
    Espera o elemento e verifica o atributo    ${REGISTRAR}    content-desc    Registrar
    Click Element    ${REGISTRAR}

Entao serao visualizadas mensagens de alerta
    Espera o elemento e verifica o atributo    ${MENSAGEM_INFORME_NOME}    content-desc     Informe o nome.
    Espera o elemento e verifica o atributo    ${MENSAGEM_INFORME_EMAIL}    content-desc    Informe o e-mail.
    Espera o elemento e verifica o atributo    ${MENSAGEM_INFORME_SENHA}    content-desc    Informe uma senha.
    Espera o elemento e verifica o atributo    ${MENSAGEM_CONFIRME_SENHA}    content-desc    Confirme a senha.

E nao insere o nome
    [Arguments]
    ${email_random}    Email
    Clica no elemento e insere texto    ${EMAIL}               ${email_random} 
    Clica no elemento e insere texto    ${SENHA}               123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}     123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}
Entao sera visualizada mensagem de alerta
    Espera o elemento e verifica o atributo    ${MENSAGEM_INFORME_NOME}    content-desc     Informe o nome.

E nao insere o email
    [Arguments]
    ${nome_random}    Name
    Clica no elemento e insere texto    ${NOME}               ${nome_random}              
    Clica no elemento e insere texto    ${SENHA}              123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

Entao sera visualizada mensagem
    Espera o elemento e verifica o atributo   ${MENSAGEM_INFORME_EMAIL}    content-desc    Informe o e-mail.

E nao insere a senha
     [Arguments]
    ${nome_random}    Name
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}               ${nome_random} 
    Clica no elemento e insere texto    ${EMAIL}              ${email_random}
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}   

Entao visualizara mensagem
    Espera o elemento e verifica o atributo    ${MENSAGEM_INFORME_SENHA}    content-desc    Informe uma senha.
    Espera o elemento e verifica o atributo    ${MENSAGEM_SENHAS_DIFERENTES}     content-desc    As senhas não coincidem   

E nao confirmar a senha
    [Arguments]
    ${nome_random}    Name
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}              ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}             ${email_random} 
    Clica no elemento e insere texto    ${SENHA}             123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}   
Entao a mensagem sera vista
    Espera o elemento e verifica o atributo    ${MENSAGEM_CONFIRME_SENHA}     content-desc    Confirme a senha 

E informa um nome com mais de 100 caracteres
    [Arguments]
    ${nome_random}    Random Letters  length=101   
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}    ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}   ${email_random}
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}
Entao aparecera o alerta
    Espera o elemento e verifica o atributo    ${MENSAGEM_ERRO}    content-desc     Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde
E informa um nome contendo 1 letra
    [Arguments]
    ${nome_random}    Random Letters  length=1   
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}
Entao o cadastro sera realizado
    Espera o elemento e verifica o atributo   ${MENSAGEM_CADASTRO}    content-desc    Cadastro realizado!

E informa um nome contendo 99 letras 
    [Arguments]
    ${nome_random}    Random Letters  length=99   
    ${email_random}    Email  
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}              123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}       

E informa um nome contendo 100 letras
    [Arguments]
    ${nome_random}    Random Letters  length=100   
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}     ${nome_random}    
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR} 

E informa um nome contendo caracteres especiais 
    Clica no elemento e insere texto    ${NOME}     $%@ Luz
    Clica no elemento e insere texto    ${EMAIL}    luzsilva@gmail.com
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}    
  
E informa um email contendo 59 caracteres
    [Arguments]
    ${nome_random}      Name
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    joaofranciscodasilvafernandesalvesbrantcastrodutr@gmail.com
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

E informa um email contendo 60 caracteres
    [Arguments]
    ${nome_random}      Name
    Clica no elemento e insere texto    ${NOME}     ${nome_random} 
    Clica no elemento e insere texto    ${EMAIL}    fabrinarafaelajoaquinaalexdrareisoliveiraconcalves@gmail.com
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}  

E informa um email contendo 61 caracteres
    [Arguments]
    ${nome_random}      Name
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    fabrinarafaelajoaquinaalexdrareisoliveiraconcalvess@gmail.com
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

E informa um email com formato invalido
    [Arguments]
    ${nome_random}      Name
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    luz@.com
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}    
Entao mensagem alerta aparecera    
    Espera o elemento e verifica o atributo    ${MENSAGEM_EMAIL_INVALIDO}    content-desc    Informe um e-mail válido.

E informa um email ja cadastrado    
    Clica no elemento e insere texto    ${NOME}     Alex Reis Goncalves
    Clica no elemento e insere texto    ${EMAIL}    luzsilva@gmail.com
    Clica no elemento e insere texto    ${SENHA}    123456
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}
Entao mensagem de alerta aparecera 
    Espera o elemento e verifica o atributo    ${MENSAGEM_EMAIL_CADASTRADO}    content-desc    E-mail já cadastrado. Utilize outro e-mail.    

E informa a senha contendo caracteres especiais
    [Arguments]
    ${nome_random}     Name   
    ${email_random}    Email
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    !@%123
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    !@%123
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

E informa a senha contendo 6 caracteres 
    [Arguments]
    ${nome_random}     Name   
    ${email_random}    Email   
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    456789
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    456789
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}
    
E informa a senha contendo 7 caracteres 
    [Arguments] 
    ${nome_random}     Name   
    ${email_random}    Email  
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random} 
    Clica no elemento e insere texto    ${SENHA}    123456@
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456@
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR} 

E informa a senha contendo 11 caracteres
    [Arguments]
    ${nome_random}     Name   
    ${email_random}    Email 
    Clica no elemento e insere texto    ${NOME}     ${nome_random} 
    Clica no elemento e insere texto    ${EMAIL}    ${email_random} 
    Clica no elemento e insere texto    ${SENHA}    123456789!@
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456789!@
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

E informa a senha contendo 12 caracteres 
    [Arguments]
    ${nome_random}     Name   
    ${email_random}    Email    
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    123456789!@&
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456789!@&
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

E informa a senha contendo 5 caracteres
    [Arguments]
    ${nome_random}     Name   
    ${email_random}    Email 
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    12345
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    12345
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}

Entao visualisa a mensagem
    Espera o elemento e verifica o atributo    ${MENSAGEM_ERRO}   content-desc   Ocorreu um erro ao realizar o cadastro. Tente novamente mais tarde.
    

E informa a senha contendo 13 caracteres
    [Arguments]
    ${nome_random}     Name   
    ${email_random}    Email 
    Clica no elemento e insere texto    ${NOME}     ${nome_random}
    Clica no elemento e insere texto    ${EMAIL}    ${email_random}
    Clica no elemento e insere texto    ${SENHA}    123456789@bp%
    Clica no elemento e insere texto    ${CONFIRMAR_SENHA}    123456789@bp%
    Hide Keyboard
    Wait Until Element Is Visible       ${REGISTRAR}    