export default class RegistroUsuarioPage{

    inputlNome = ('[placeholder="Nome"]');
    inputEmail = ('[placeholder="E-mail"]');    
    inputSenha = ('[placeholder="Senha"]');
    inputConfirmarSenha = ('[placeholder="Confirmar senha"]');
    
    buttonCadastrar = ('.account-save-button');
    buttonOk = ('.modal-actions button');
    mensagemErro = ('span.input-error')
    mensagemOcoreuErro = ('div.modal-body h3')
    mensagemSucesso = ('div.modal-body')
    
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