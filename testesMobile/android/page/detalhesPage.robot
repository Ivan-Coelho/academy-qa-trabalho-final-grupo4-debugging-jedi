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

${CARD_FILME}                    xpath=//android.widget.ImageView[contains(@content-desc, '')]

${CARD_VALIACAO_AUDIENCIA}       xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${CARD_VALIACAO_CRITICA}         xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
${CARD_VALIACOES}                xpath=//android.widget.ImageView[contains(@content-desc,"")]/android.view.View[3]
${ADICIONAR_REVIEW}              xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${BTN_VOLTAR}		             xpath=//android.widget.Button[@content-desc="Back"]
${LABEL_TITULO}		             xpath=//android.view.View[@content-desc="Detalhes do filme"]
${LABEL_HOME}		             xpath=//android.view.View[@content-desc="Home"]
${BASE_URL}                      url=https://raromdb-3c39614e42d4.herokuapp.com/api/movies

${PARTE_DO_CONTENT_DESC}        O Rei Leão
${CARD_REI_LEAO}                xpath=//android.widget.ImageView[contains(@content-desc, '${PARTE_DO_CONTENT_DESC}')]

*** Keywords ***

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
    
Dado que usuário logado acessa o aplicativo
    Registrar Usuário
    Efetuar Login com Dados Registrados  

# Então usuário conseguirá ver detalhes do filme Rei leao
#     Element Should Be Visible    ${LABEL_HOME}
#     Swipe até o elemento visível    ${PARTE_DO_CONTENT_DESC}
#     Clicar no Elemento               ${PARTE_DO_CONTENT_DESC}
    
Quando acessa a página de detalhes do filme rei leao
    
    Element Should Be Visible    ${LABEL_HOME}
    Swipe até o elemento visível    ${CARD_REI_LEAO}
    Sleep    2    
    Clicar no Elemento               ${CARD_REI_LEAO}