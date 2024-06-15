*** Settings ***

Resource   ../base.robot
Resource    ../page/Page.robot
Library    XML
Library    AppiumLibrary 
Library    RequestsLibrary
Library    OperatingSystem

*** Variables ***
${HOME}			                 xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		                 xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${VIEW_FILME}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View
${CARD_FILME}                    xpath=//android.widget.ImageView[contains(@content-desc, '${parte_do_content_desc}')]
${PARTE_DO_CONTENT_DESC}    Por lugares incríveis
${CARD_VALIACAO_AUDIENCIA}       xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${CARD_VALIACAO_CRITICA}         xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
${CARD_VALIACOES}                xpath=//android.widget.ImageView[contains(@content-desc,"")]/android.view.View[3]
${ADICIONAR_REVIEW}              xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${BTN_VOLTAR}		             xpath=//android.widget.Button[@content-desc="Back"]
${LABEL_TITULO}		             xpath=//android.view.View[@content-desc="Detalhes do filme"]
${LABEL_HOME}		             xpath=//android.view.View[@content-desc="Home"]
${BASE_URL}                      url=https://raromdb-3c39614e42d4.herokuapp.com/api/movies


*** Keywords ***
# ${filme_texto} =    Get Text    ${CARD_FILME}

Dado que usuario não cadastrado acessa o site
    Abrir App
Quando acessa a página de detalhes de um filme
    
    Element Should Be Visible    ${LABEL_HOME}
    Wait Until Page Contains Element        ${CARD_FILME}
    Clicar no Elemento               ${CARD_FILME}
    
Então usuário conseguirá ver a página de detalhes do filme
    Wait Until Page Contains Element        ${LABEL_TITULO}
    Wait Until Page Contains Element    ${CARD_VALIACAO_AUDIENCIA}
    Swipe até o elemento visível    ${CARD_VALIACAO_CRITICA}
    Swipe Até Elemento Visível    ${CARD_VALIACOES}
    
Dado que usuário logado acessa o site
    Registrar Usuário
    Efetuar Login com Dados Registrados  
Criar Filme
   ${filme_data} =    Create Dictionary
    ...    title=Teste Raro
    ...    genre=Debugando
    ...    description=Eu gosto e assim
    ...    durationInMinutes=124
    ...    releaseYear=2024
