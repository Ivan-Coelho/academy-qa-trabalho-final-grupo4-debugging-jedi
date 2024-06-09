export default class LoginPage{
  
    linkPaginaLogin = ('[href="/login"]');
    linkPaginaRegistro = ('[href="/register"]');
    linkInicio = '.logo'

    inputEmail = ('[placeholder="E-mail"]');
    inputSenha = ('[placeholder="Password"]');

    buttonLogin = ('.login-button')

    inputFilmes = ('[placeholder="Buscar filmes"]');
    buttonPesquisarFilme = ('.search-button');

    mensagemErroLogin = ('.error-message');
    mensagemFalhaAuth = ('div.modal-body h3')

    mensagemErro = ('.input-error')

    typeEmail(email){
        cy.get(this.inputEmail).type(email);
    }

    typeSenha(senha){
        cy.get(this.inputSenha).type(senha);
    }

    clickButtonLogin(){
        cy.get(this.buttonLogin).click();
    }


}