export default class RegistroPage{

    linkPaginaLogin = ('[href="/login"]');
    linkPaginaRegistro = ('[href="/register"]');
    linkInicio = '.logo'

    inputlNome = ('[placeholder="Nome"]');
    inputEmail = ('[placeholder="E-mail"]');    
    inputSenha = ('[placeholder="Senha"]');
    inputConfirmarSenha = ('[placeholder="Confirmar senha"]');

    buttonCadastrar = ('.account-save-button');

    mensagemErro = ('.input-error')
    mensagemSucesso = ('.error-message');
    mensagemSucessoCadastro = ('div.modal-body h3')

    mensagemEmailjaCadastrado = ('.error-message');
    buttonOk = ('.modal-actions button');

    typeNome(nome){
        cy.get(this.inputlNome).type(nome);
    }

    typeEmail(email){
        cy.get(this.inputEmail).type(email);
    }

    typeSenha(senha){
        cy.get(this.inputSenha).type(senha);
    }

    typeConfSenha(confSenha){
        cy.get(this.inputConfirmarSenha).type(confSenha);
    }

    clickButtonCadastrar(){
        cy.get(this.buttonCadastrar).click();    }




}