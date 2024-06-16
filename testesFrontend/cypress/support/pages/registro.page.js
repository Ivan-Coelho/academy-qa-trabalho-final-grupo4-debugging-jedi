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

    digitarNome(nome) {
        cy.get(this.inputlNome).type(nome);
    }
    
    digitarEmail(email) {
        cy.get(this.inputEmail).type(email);
    }
    
    digitarSenha(senha) {
        cy.get(this.inputSenha).type(senha);
    }
    
    confirmarSenha(senha) {
        cy.get(this.inputConfirmarSenha).type(senha);
    }
    
    clicarBotaoCadastrar() {
        cy.get(this.buttonCadastrar).click();
    }




}