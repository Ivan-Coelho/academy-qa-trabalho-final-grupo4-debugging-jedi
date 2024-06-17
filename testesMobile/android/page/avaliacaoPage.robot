*** Settings ***

Resource    ../base.robot

*** Variables ***

${HOME}			                 xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		                 xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${VIEW_FILME}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View
${CARD_FILME}                    xpath=//android.widget.ImageView[contains(@content-desc, "")]
${CARD_VALIACAO_AUDIENCIA}       xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${CARD_VALIACAO_CRITICA}         xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
${CARD_VALIACOES}                xpath=//android.widget.ImageView[contains(@content-desc,"")]/android.view.View[3]
${ADICIONAR_REVIEW}              xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${LABEL_TITULO}                  xpath=//android.view.View[@content-desc="Review"]
${BTN_VOLTAR}		             xpath=//android.widget.Button[@content-desc="Back"]
${LABEL_CESCRICAO}               xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]
${SCORE}                         xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]
${SCORE_1}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[1]
${SCORE_2}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[2]
${SCORE_3}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[3]
${SCORE_4}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[4]
${SCORE_5}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[5]
${IMPUT_TEXT_REVIEW}             xpath=//android.widget.EditText
${BTN_SALVAR}		             xpath=//android.widget.Button[@content-desc="Salvar"]
${ERRO_LOGIN}		             xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${SUCESSO_REVIEW}		         xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${ERRO_REVIEW}		             xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]
${FILME_ENCONTRADO}              xpath=//android.widget.ImageView[contains(@content-desc, "Star Wars: Uma nova esperança")]
  

*** Keywords ***
Existe um filme cadastrado
    cadastrar usuario na API
    Login usuario pela API    ${EMAIL_API}
    Evoluir para administrador    ${TOKEN}
    Criar um filme    ${TOKEN}

Existe um filme cadastrado com review
    cadastrar usuario na API
    Login usuario pela API    ${EMAIL_API}
    Evoluir para administrador    ${TOKEN}
    Criar um filme    ${TOKEN}

Dado que usuário critico acessa o aplicativo
    cadastrar usuario na API
    Login usuario pela API    ${EMAIL_API}
    Evoluir para Critico    ${TOKEN}
    Efetua Login do usuário    ${EMAIL_API}

E encontra um filme de interesse
    [Arguments]    ${filme}
    Swipe até o elemento visível    ${filme}    
    Wait Until Keyword Succeeds    5    1    Espera o elemento e clica no elemento    ${FILME_ENCONTRADO}

E acessa a tela de avaliaçao do filme
    Espera o elemento e clica no elemento    ${ADICIONAR_REVIEW}

E da uma nota para o filme
    [Arguments]    ${LOCATOR_NOTA}
    Espera o elemento e clica no elemento    ${SCORE_5}

E escreve um comentario
    [Arguments]    ${texto}
    Clica no elemento e insere texto    ${IMPUT_TEXT_REVIEW}     ${texto}
    
E salva a Avaliação
    Espera o elemento e clica no elemento    ${BTN_SALVAR}

Então o sistemar retorna uma mensagem
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible     ${elemento}
    Verifica texto    ${elemento}    ${texto}

E será possível vizualizar a sua avaliação
    Press Keycode    4
    Press Keycode    4
    Wait Until Keyword Succeeds    5    1    Page Should Contain Text    Melhor filme do mundo    
    

E avalia um filme
    [Arguments]              ${nota}     ${comentario}    
    E da uma nota para o filme    ${nota}
    E escreve um comentario       ${comentario}
    E salva a Avaliação

E atualiza a review
    [Arguments]        ${nota}    ${comentario}
    E avalia um filme    ${nota}    ${comentario}



    
# E avalia um filme sem comentar
#     E da uma nota para o filme    ${SCORE_5}
#     E salva a Avaliação

# E avalia um filme sem atribuir uma nota
#     E escreve um comentario       Melhor filme do mundo
#     E salva a Avaliação
