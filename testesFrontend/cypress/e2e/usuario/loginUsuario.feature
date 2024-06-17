language: pt
Funcionalidade: Login de Usuario


Contexto: Antenticar Usuário
 Dado que acessei a pagina de login 

@criarUser @deletarUser
Cenário: A sessão do usuário deve expirar após 60 min
    Quando efetuo login 
    E a sessão passa de 60 minutos
    Então usuário deverá ser deslogado e direcionado para a página inicial

Cenário: Tentativa de login com usuario não cadastrado
  Quando preencho um email não cadastrado
  E preencho uma senha nao cadastrada
  E aciono a opção de efetuar login
  Então o usuario nao será autenticado

Cenário: Tentativa de login com usuario invalido
  Quando preencho um email não valido
  E preencho uma senha
  E aciono a opção de efetuar login
  Então o usuario verá uma mensagem inforamndo que o email não é valido

Cenário: Tentativa de login sem informar as credenciais
  Quando não preencho um email
  E não preencho uma senha
  E aciono a opção de efetuar login
  Então verei mensagem informando que o e-mail e a senha são de preenchimento obrigatorio


Cenário: Tentativa de login informando senha diferente da senha cadastrada para o usuario
   Quando preencho um email de um usuario cadastrado 
   E preencho a senha utilizando a senha diferente da que foi digitada para um usuario cadastrado
   E aciono a opção de efetuar login
   Então o usuario nao será autenticado

@criarUser @deletarUser
Cenário: Efetuar Login
    Quando efetuo login 
    Então meu usuario será autenticado no sistema