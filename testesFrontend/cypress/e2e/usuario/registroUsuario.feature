# language: pt
Funcionalidade: Registro de usuario

Contexto: Usuario deve ter acesso a pagina de registro
    Dado que acessei a pagina de registro de usuario

Cenario: Tentativa de registrar usuario sem informar o nome     
  Quando nao informar um novo nome
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então aparecera a mensagem de erro 

Cenario: Tentativa de registrar usuario sem informar o email     
  Quando informar um novo nome
  E nao informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então aparecera a mensagem

Cenario: Tentativa de registrar usuario sem informar senha     
  Quando informar um novo nome
  E informar um novo email
  E nao informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então aparecerao as mensagens 

Cenario: Tentativa de registrar usuario sem confirmar senha     
  Quando informar um novo nome
  E informar um novo email
  E informar uma nova senha 
  E nao confirmar a senha 
  E confirmar a operação
  Então aparecera uma mensagem 

Cenario: Tentativa de registrar usuario com nome de mais 100 caracteres     
  Quando informar um novo nome com mais de 100 caracteres
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então a mensagem aparecera

Cenario: Tentativa de registrar usuario com email 61 caracteres    
  Quando informar um novo nome
  E informar um novo email com 61 caracteres
  E informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então uma mensagem aparecera

Cenario: Tentativa de registrar usuario com email com formato invalido    
  Quando informar um novo nome
  E informar um novo email com formato invalido
  E informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então aparecera uma mensagem de alerta  

Cenario: Tentativa de registrar usuario informando senha 5 caracteres
  Quando informar um novo nome
  E informar um novo email
  E informar uma senha contendo 5 caracteres 
  E confirmar a senha 
  E confirmar a operação
  Entao vai aparecer o alerta

Cenario: Tentativa de registrar usuario informando senha 13 caracteres
  Quando informar um novo nome
  E informar um novo email
  E informar uma nova senha contendo 13 caracteres
  E confirmar a senha 
  E confirmar a operação
  Então uma mensagem de alerta vai aparecer 

Cenario: Tentativa de registrar usuario informando nome com espaco em branco
  Quando informar um novo nome com espaço em branco
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E confirmar a operação
  Então aparecera a mensagem de erro

Cenario: Tentativa de registrar usuario informando senha com espaco em branco
  Quando informar um novo nome
  E informar um novo email
  E informar uma nova senha com espaco em branco
  E confirmar a senha 
  E confirmar a operação
  Então aparecerao as mensagens  

Cenario: Tentativa de registrar usuario utilizando um e-mail de um usuario já cadastrado
  Quando informar um novo nome
  E informar um email de um usuário já cadastrado
  E informar uma nova senha
  E confirmar a senha 
  E confirmar a operação
  Então uma mensagem de falha no cadastro irá aparecer


Cenario: Registrar usuario com nome de 1 letra    
  Quando informar nome com 1 letra
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E salvar as informações
  Então o usuario sera cadastrado  

Cenario: Registrar usuario com nome de 99 letras    
  Quando informar um novo nome contendo 99 letras
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E salvar as informações
  Então o usuario sera cadastrado
   
Cenario: Registrar usuario com um nome de 100 letras    
  Quando informar um novo nome com 100 letras
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E salvar as informações
  Então o usuario sera cadastrado   

Cenario: Registrar usuario com caracteres especiais    
  Quando informar um novo nome com caracteres especiais
  E informar um novo email
  E informar uma nova senha 
  E confirmar a senha 
  E salvar as informações
  Então o usuario sera cadastrado  

Cenario: Registrar usuario com email 59 caracteres    
  Quando informar um novo nome 
  E informar um novo email com 59 caracteres
  E informar uma nova senha 
  E confirmar a senha 
  E salvar as informações
  Então o usuario sera cadastrado  

Cenario: Registrar usuario com email 60 caracteres    
  Quando informar um novo nome
  E informar um novo email 60 caracteres 
  E informar uma nova senha 
  E confirmar a senha 
  E salvar as informações
  Então o usuario sera cadastrado  

Cenario: Registrar usuario informando senha com caracteres especias    
  Quando informar um novo nome
  E informar um novo email 
  E informar uma nova senha com caracteres especiais
  E confirmar 
  E salvar as informações
  Então o usuario sera cadastrado 

Cenario: Registrar usuario informando senha 6 caracteres
  Quando informar um novo nome
  E informar um novo email  
  E informar uma nova senha 6 caracteres
  E confirmar a senha de 6 caracteres
  E salvar as informações
  Então o usuario sera cadastrado

Cenario: Registrar usuario informando senha 7 caracteres
  Quando informar um novo nome
  E informar um novo email 
  E informar uma nova senha 7 caracteres
  E confirmar a senha de 7 caracteres
  E salvar as informações
  Então o usuario sera cadastrado 

Cenario: Registrar usuario informando senha 11 caracteres
  Quando informar um novo nome
  E informar um novo email 
  E informar uma nova senha 11 caracteres
  E confirmar a senha de 11 caracteres
  E salvar as informações
  Então o usuario sera cadastrado   

Cenario: Registrar usuario informando senha 12 caracteres
  Quando informar um novo nome
  E informar um novo email  
  E informar uma nova senha 12 caracteres
  E confirmar a senha de 12 caracteres
  E salvar as informações
  Então o usuario sera cadastrado

Cenario: Registrar usuario informando senha contendo letras
  Quando informar um novo nome
  E informar um novo email  
  E informar uma nova senha com letras
  E confirmar a senha com letras
  E salvar as informações
  Então o usuario sera cadastrado