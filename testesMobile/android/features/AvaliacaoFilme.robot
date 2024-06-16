*** Settings ***

Resource    ../base.robot

# Test Setup        Abrir App
# Test Teardown     Teardown

*** Test Cases ***

CT001 - teste 
    cadastrar usuario na API
    Login usuario pela API    ${EMAIL}
    Evoluir para administrador    ${TOKEN}
    Criar um filme    ${TOKEN}
    Deletar um filme    ${TOKEN}    ${ID_FILME}    
