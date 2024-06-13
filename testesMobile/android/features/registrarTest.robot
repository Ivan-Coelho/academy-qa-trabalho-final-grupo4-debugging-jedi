*** Settings ***
Resource    ../utils/config.robot
Resource    ../utils/commons.robot
Resource    ../page/Page.robot


Test Setup        Abrir App
Test Teardown     Teardown


*** Test Cases ***

CT001 - Visitar pagina inicial
   Dado que o usuario acessa a tela inicial
   Entao deve visualizar a home

CT002 - Registar usuario
    Quando clica na opcao menu
    E clica na opcao registrar-se
    E insere os dados necessarios
    Entao o usuario sera registrado   

CT003 - Registrar usuario sem informar os dados     
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E nao insere os dados
    E clica na opcao registrar
    Entao serao visualizadas mensagens de alerta

CT004 - Registrar usuario sem informar o nome     
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E nao insere o nome
    E clica na opcao registrar
    Entao sera visualizada mensagem de alerta    

CT005 - Registrar usuario sem informar o email     
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E nao insere o email
    E clica na opcao registrar
    Entao sera visualizada mensagem

CT006 - Registrar usuario sem informar senha     
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E nao insere a senha
    E clica na opcao registrar
    Entao visualizara mensagem    

CT007 - Registrar usuario sem confirmar senha     
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E nao confirmar a senha
    E clica na opcao registrar
    Entao a mensagem sera vista

CT008 - Registrar usuario com nome de mais 100 caracteres     
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um nome com mais de 100 caracteres
    E clica na opcao registrar
    Entao aparecera o alerta   

CT009 - Registrar usuario com nome 1 letra    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um nome contendo 1 letra
    E clica na opcao registrar
    Entao o cadastro sera realizado 

CT010 - Registrar usuario com nome 99 letras    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um nome contendo 99 letras
    E clica na opcao registrar
    Entao o cadastro sera realizado   
CT011 - Registrar usuario com nome 100 letras    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um nome contendo 100 letras
    E clica na opcao registrar
    Entao o cadastro sera realizado

CT012 - Registrar usuario com caracteres especiais    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um nome contendo caracteres especiais
    E clica na opcao registrar
    Entao o cadastro sera realizado  

CT013 - Registrar usuario com email 59 caracteres    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um email contendo 59 caracteres
    E clica na opcao registrar
    Entao o cadastro sera realizado

CT014 - Registrar usuario com email 60 caracteres    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um email contendo 60 caracteres
    E clica na opcao registrar
    Entao o cadastro sera realizado

CT015 - Registrar usuario com email 61 caracteres    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um email contendo 61 caracteres
    E clica na opcao registrar
    Entao aparecera o alerta    

CT016 - Registrar usuario com email formato invalido    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um email com formato invalido
    E clica na opcao registrar
    Entao mensagem alerta aparecera 

CT017 - Registrar usuario com email ja cadastrado    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa um email ja cadastrado
    E clica na opcao registrar
    Entao mensagem de alerta aparecera    

CT018 - Registrar usuario informando senha com caracteres especias    
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo caracteres especiais
    E clica na opcao registrar
    Entao o usuario sera registrado

CT019 - Registrar usuario informando senha 6 caracteres
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo 6 caracteres
    E clica na opcao registrar
    Entao o usuario sera registrado

CT020 - Registrar usuario informando senha 7 caracteres
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo 7 caracteres
    E clica na opcao registrar
    Entao o usuario sera registrado

CT021 - Registrar usuario informando senha 11 caracteres
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo 11 caracteres
    E clica na opcao registrar
    Entao o usuario sera registrado    

CT022 - Registrar usuario informando senha 12 caracteres
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo 12 caracteres
    E clica na opcao registrar
    Entao o usuario sera registrado

CT023 - Registrar usuario informando senha 5 caracteres
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo 5 caracteres
    E clica na opcao registrar
    Entao visualisa a mensagem
CT024 - Registrar usuario informando senha 13 caracteres
    Dado que o usuario acessa a tela inicial
    Quando clica na opcao menu
    E clica na opcao registrar-se  
    E informa a senha contendo 13 caracteres
    E clica na opcao registrar
    Entao visualisa a mensagem     

    