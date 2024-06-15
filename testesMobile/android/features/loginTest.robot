*** Settings ***

Resource    ../../base.robot

Test Setup        Open App
Test Teardown     Teardown

*** Test Cases ***
CT - Deve ser possível acessar tela de Login
    Dado que o usuário abriu o aplicativo
    Quando o usuario abrir o menu
    E a opção de login
    Então será possivel acessar a tela de login

CT - Deve ser possível usuário logar com os campos válidos
    Dado que o usuario acessou a tela de login
    Quando digita seus dados válidos
    Então usuário deve logar com sucesso

CT - Usuário não deve conseguir autenticar-se sem informar e-mail
    Dado que o usuario acessou a tela de login
    Quando digita os campos de login exceto Email
    E clica em login
    Então deve surgir um aviso de preenchimento de e-mail obrigatório

CT - Usuário não deve conseguir autenticar-se sem informar senha
    Dado que o usuario acessou a tela de login
    Quando digita os campos de login exceto Senha    
    E clica em login
    Então deve surgir um aviso de preenchimento de senha obrigatório

CT - Usuário não deve conseguir autenticar-se sem informar os campos obrigatórios
    Dado que o usuario acessou a tela de login
    Quando não preenche os campos de Email e Senha
    E clica em login
    Então deve surgir um aviso de preenchimento de campos obrigatórios

CT - Usuário não deve conseguir autenticar-se com e-mail não cadastrado
    Dado que o usuario acessou a tela de login
    Quando preenche com um e-mail não cadastrado
    E clica em login
    Então deve surgir um aviso de e-mail ou senha incorretos

CT - Usuário não deve conseguir autenticar-se com senha incorreta
    Dado que o usuario acessou a tela de login
    Quando preenche com uma senha incorreta
    E clica em login
    Então deve surgir um aviso de e-mail ou senha incorretos