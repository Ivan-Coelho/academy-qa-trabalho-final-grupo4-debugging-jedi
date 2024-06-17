import {
    Given,
    When,
    Then,
    Before,
    After,
  } from '@badeball/cypress-cucumber-preprocessor';

  import { faker } from '@faker-js/faker';

  import LoginPage from '../../pages/login.page';

  const paginaLogin = new LoginPage();

let name;
let email;
let senha;
let id;
let tokenAdmin;
let idAdmin;

Before({tags:'@criarUser'}, function(){
    cy.criarUsuario().then(function(response){
       id=  response.body.id
       cy.log(id)
       name= response.body.name
       email= response.body.email
       cy.log(email)
       senha= '123456'
       cy.log(senha)
    });
});

After({tags:'@deltetarUser'}, function(){
           cy.criarUsuarioAdmin().then(function(response){
            tokenAdmin = response.token
            idAdmin = response.id
            cy.deletarUsuario(id, tokenAdmin);
            cy.deletarUsuario(idAdmin, tokenAdmin);
        })
});


Given('que acessei a pagina de login', function () {
     cy.visit('login');
});


 When('efetuo login', function(){
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha(senha)
    cy.intercept('POST', '/api/auth/login').as('loginUser');
    paginaLogin.clickButtonLogin();
    cy.wait('@loginUser');
 })

 When('a sessão passa de 60 minutos', function(){
    cy.clock() // congela o relógio do navegador
    cy.tick(3600000) //// avança o relógio do navegador em uma hora usando milissegundos
 })

 Then('usuário deverá ser deslogado e direcionado para a página inicial',function(){
    cy.contains('Filmes em destaque')
 })

 When('preencho um email não cadastrado', function(){
    paginaLogin.typeEmail('fulano635@raro.com');

})

When('preencho uma senha nao cadastrada', function(){
    paginaLogin.typeSenha('senha234');

})
When('aciono a opção de efetuar login', function(){
    paginaLogin.clickButtonLogin();

})
Then('o usuario nao será autenticado',function(){
    cy.contains(paginaLogin.mensagemFalhaAuth, "Falha ao autenticar").should('be.visible')
    cy.contains(paginaLogin.mensagemErroLogin, "Usuário ou senha inválidos.").should('be.visible')
})

When('preencho um email não valido', function(){
    paginaLogin.typeEmail('@raro');
})

When('preencho uma senha', function(){
    paginaLogin.typeSenha('123456');
})

Then('o usuario verá uma mensagem inforamndo que o email não é valido', function(){
    cy.contains(paginaLogin.mensagemErro,"Informe um e-mail válido.").should('be.visible')
})

When('não preencho uma senha', function(){

})

When('não preencho um email', function(){

})
Then('verei mensagem informando que o e-mail e a senha são de preenchimento obrigatorio', function(){
    cy.contains(paginaLogin.mensagemErro,"Informe o e-mail.").should('be.visible')
    cy.contains(paginaLogin.mensagemErro,"Informe a senha").should('be.visible')
})


When('preencho um email de um usuario cadastrado', function(){
    paginaLogin.typeEmail(email);
})

When('preencho a senha utilizando a senha diferente da que foi digitada para um usuario cadastrado', function(){
    paginaLogin.typeSenha('908783')
})


Then('meu usuario será autenticado no sistema',function(){
    cy.contains('Perfil')
    cy.contains('Filmes em destaque')
 })