*** Keywords ***


Espera o elemento e clica no elemento
    [Arguments]    ${ELEMENTO} 
    Wait Until Element Is Visible   ${ELEMENTO}
    Click Element    ${ELEMENTO}

Clica no elemento e insere texto
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible    ${elemento}
    Click Element    ${elemento}
    Sleep    1
    Input Text     ${elemento}    ${texto}

Espera o elemento e verifica o atributo
    [Arguments]    ${elemento}    ${atributo}    ${valor_atributo}
    Wait Until Element Is Visible        ${elemento}    10
    Element Attribute Should Match       ${elemento}    ${atributo}    ${valor_atributo}    regexp=true  

Espera o elemento e faz o inputtest    
    [Arguments]    ${elemento}    ${texto}
    Wait Until Element Is Visible    ${elemento}  
    Input Text    ${elemento}     ${texto}  