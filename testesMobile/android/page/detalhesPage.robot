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

${PARTE_DO_CONTENT_DESC}         Star Wars: Uma nova esperança
${CARD_FILME_CADASTRADO}         xpath=//android.widget.ImageView[contains(@content-desc, '${PARTE_DO_CONTENT_DESC}')]

${LABEL_TITULO_REVIEW}           xpath=//android.view.View[@content-desc="Review"]
${BTN_VOLTAR}		             xpath=//android.widget.Button[@content-desc="Back"]
${LABEL_DESCRICAO}               xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]
${IMPUT_TEXT_REVIEW}             xpath=//android.widget.EditText

*** Keywords ***

Dado que usuario comum acessa o site
    Element Should Be Visible    ${LABEL_HOME}
Quando acessa a página de detalhes de um filme

    Element Should Be Visible    ${LABEL_HOME}
    Wait Until Page Contains Element        ${CARD_FILME}
    Clicar no Elemento               ${CARD_FILME}
    
Então usuário conseguirá ver a página de detalhes do filme
    Wait Until Page Contains Element        ${LABEL_TITULO}
    Verifica se contem o text no content-desc    ${CARD_FILME}    Ano de Lançamento:
    Verifica se contem o text no content-desc    ${CARD_FILME}    Duração:
    Wait Until Page Contains Element    ${CARD_VALIACAO_AUDIENCIA}
    Swipe até o elemento visível    ${CARD_VALIACAO_CRITICA}
    Swipe Até Elemento Visível    ${CARD_VALIACOES}
    
Dado que usuário logado acessa o aplicativo
    Registrar Usuário
    Efetuar Login com Dados Registrados  

Então o usuário conseguirá visualizar um totalizador das avaliações
    Wait Until Page Contains Element    ${CARD_VALIACAO_AUDIENCIA}
    Verifica se contem o text no content-desc    ${CARD_VALIACAO_AUDIENCIA}    Avaliação da audiência

E que tem um filme previamente cadastrado
    cadastrar usuario na API
    Login usuario pela API    ${EMAIL}
    Evoluir para administrador    ${TOKEN}
    Criar um filme    ${TOKEN}
Quando acessa o filme especifico
    Element Should Be Visible    ${LABEL_HOME}
    Swipe até o elemento visível    ${CARD_FILME_CADASTRADO}
    Sleep    2    
    Clicar no Elemento               ${CARD_FILME_CADASTRADO}

Então usuário conseguirá ver a página de detalhes do filme especifico
    Wait Until Page Contains Element        ${LABEL_TITULO}
    Verifica se contem o text no content-desc    ${CARD_FILME_CADASTRADO}    Star Wars: Uma nova esperança
    Verifica se contem o text no content-desc    ${CARD_FILME_CADASTRADO}    Ano de Lançamento:
    Verifica se contem o text no content-desc    ${CARD_FILME_CADASTRADO}    Duração:
    Verifica se contem o text no content-desc    ${CARD_FILME_CADASTRADO}    Gênero: Épico, Aventura, Ficção científica
    Wait Until Page Contains Element    ${CARD_VALIACAO_AUDIENCIA}
    Swipe até o elemento visível    ${CARD_VALIACAO_CRITICA}
    Swipe Até Elemento Visível    ${CARD_VALIACOES}
    Wait Until Page Contains Element    ${ADICIONAR_REVIEW}

Então será permitido criar uma avaliação para o filme
    Wait Until Page Contains Element        ${ADICIONAR_REVIEW}
    Click Element    ${ADICIONAR_REVIEW}
    Sleep    2
    Wait Until Page Contains Element        ${LABEL_TITULO_REVIEW}
    Verifica se contem o text no content-desc        ${LABEL_DESCRICAO}    Dê sua nota para o filme:
    Wait Until Page Contains Element    ${IMPUT_TEXT_REVIEW}

Então o usuário conseguirá visualizar todas as avaliações registradas para o filme
    Wait Until Page Contains Element        ${LABEL_TITULO}
    Wait Until Page Contains Element    ${CARD_VALIACAO_AUDIENCIA}
    Swipe até o elemento visível    ${CARD_VALIACAO_CRITICA}
    Swipe Até Elemento Visível    ${CARD_VALIACOES}
