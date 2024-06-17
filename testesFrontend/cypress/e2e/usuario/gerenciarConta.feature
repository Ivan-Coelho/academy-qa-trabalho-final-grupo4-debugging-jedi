# language: pt
Funcionalidade: Gerenciar conta


Contexto: Gerenciar conta de um usuário
 Dado que usuário está logado e acessou a página de gerenciar conta

 @criarUser @deletarUser
 Cenário: Alterar Nome e senha de usuário
    Quando eu informo um novo Nome
    E aciono a opção de alterar senha
    E informo a nova senha
    E informo a confirmação da senha que corresponda a nova senha
    E aciono a opção de salvar minhas informações
    Então minhas informações serão alteradas

 @criarUser @deletarUser
 Cenário: Deve alterar somente nome do usuário
  Quando eu informo um novo Nome
  E aciono a opção de salvar minhas informações
  Então minhas informações serão alteradas

 @criarUser @deletarUser
  Cenário: Deve alterar somente a senha do usuario
  E aciono a opção de alterar senha
  E informo a nova senha
  E informo a confirmação da senha que corresponda a nova senha
  E aciono a opção de salvar minhas informações
  Então minhas informações serão alteradas

 @criarUser @deletarUser
  Cenário: Não Deve Alterar e-mail
  Quando tento digitar um e-mail
  E aciono a opção de salvar minhas informações
  Então minhas informações serão alteradas

@criarUser @deletarUser
Cenário: Deve alterar o nome contendo com 1 letra 
   Quando informo um novo nome contendo 1 letra
   E aciono a opção de salvar minhas informações
   Então minhas informações serão alteradas

@criarUser @deletarUser
Cenário: Deve alterar o nome contendo 100 letras
   Quando informo um novo nome contendo 100 letras
   E aciono a opção de salvar minhas informações
   Então minhas informações serão alteradas
@criarUser @deletarUser
Cenário: Deve alterar o nome contendo 99 letras
   Quando informo um novo nome contendo 99 letras
   E aciono a opção de salvar minhas informações
   Então minhas informações serão alteradas

@criarUser @deletarUser
Cenário: Não deve alterar o nome contendo 101 letras
   Quando informo um novo nome contendo 101 letras
   E aciono a opção de salvar minhas informações
   Então minhas informações não serão alteradas

@criarUser @deletarUser
Cenário: Deve alterar a senha para 7 caracters
    E aciono a opção de alterar senha
    E informo a nova senha contendo 7 caracteres
    E informo a confirmação da senha correspondente
    E aciono a opção de salvar minhas informações
    Então minhas informações serão alteradas

@criarUser @deletarUser
Cenário: Não deve alterar a senha para 13 caracters
    E aciono a opção de alterar senha
    E informo a nova senha contendo 13 caracteres
    E confirmo a nova senha 
    E aciono a opção de salvar minhas informações
    Então informações não serão alteradas

@criarUser @deletarUser
Cenário: Não deve alterar o nome com espaço em branco
    Quando eu informo um novo nome com espaço em branco
    E aciono a opção de salvar minhas informações
     Então informações não serão alteradas

@criarUser @deletarUser
Cenário: Não deve alterar a senha informando espaço em branco
    E aciono a opção de alterar senha
    E informo a nova senha contendo contendo espaços em branco
    E confirmo a senha nova 
    E aciono a opção de salvar minhas informações
     Então informações não serão alteradas