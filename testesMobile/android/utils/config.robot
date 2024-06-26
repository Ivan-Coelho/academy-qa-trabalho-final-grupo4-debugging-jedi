*** Settings ***

Resource   ../base.robot

*** Variables ***
${ANDROID_AUTOMATION_NAME}    UIAutomator2
${ANDROID_PLATFORM_NAME}      Android
${ANDROID_PLATFORM_VERSION}   11
${APP_PACKAGE}                com.example.raromdb
${APP_ACTIVITY}               .MainActivity

${CARD_FILME}     xpath=//android.widget.ImageView[contains(@content-desc, "")]

*** Keywords ***
Abrir App
    Open Application   http://127.0.0.1:4723 
    ...    automationName=${ANDROID_AUTOMATION_NAME}
    ...    platformName=${ANDROID_PLATFORM_NAME}    platformVersion=${ANDROID_PLATFORM_VERSION}
    ...    appPackage=${APP_PACKAGE}    appActivity=${APP_ACTIVITY}   autoGrantPermissions=true 

Teardown
    [Arguments]
    Run Keyword If Test Failed    Capture Page Screenshot
    Close All Applications

Clicar no Elemento
    [Arguments]    ${element_locator}
    Click Element    ${element_locator}

Swipe Até Elemento Visível
    [Arguments]    ${element_locator}
    ${element_visible}    Run Keyword And Return Status    Element Should Be Visible    ${element_locator}    timeout=10s
    