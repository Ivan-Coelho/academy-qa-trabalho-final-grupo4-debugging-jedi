export default class GerenciarContaPage{

    linkPaginaPerfil = ('a[href="/profile"]');
    linkPaginaGerenciarConta = ('a[href="/account"]');

    inputNome = ('[placeholder="Nome"]');
    inputSenha = ('[placeholder="Senha"]');
    inputConfirmarSenha = ('[placeholder="Confirmar senha"]');
    inputTipoUsuario = (':nth-child(3) > .profile-input')


    labelEmail = ('[placeholder="E-mail"]');

    buttonPesquisarFilme = ('.search-button');
    buttonAlterarSenha = ('.account-password-button');
    buttonSalvar = ('.account-save-button');
    buttonCancelar = ('.account-password-button-cancel');


    mensagem = ('div.modal-body p');
    mensagemErro = ('.input-error')
    mensagemSucesso = ('div.modal-body h3')


    typeNome(nome){
        cy.get(this.inputNome).clear().type(nome);
    }

    typeSenha(senha){
        cy.get(this.inputSenha).type(senha);
    }

    typeConfSenha(confSenha){
        cy.get(this.inputConfirmarSenha).type(confSenha);
    }

    clickButtonAlterarSenha(){
        cy.get(this.buttonAlterarSenha).click();
    }

    clickButtonSalvar(){
        cy.get(this.buttonSalvar).click();
    }

    clickButtonCancelar(){
        cy.get(this.buttonCancelar).click();
    }

    clickPaginaPerfil(){
        cy.get(this.linkPaginaPerfil).click();
    }

    clickPaginaGerenciarConta(){
        cy.get(this.linkPaginaGerenciarConta).click();
    }

    emailDesabilitado(){
        if(this.labelEmail.disabled)
            cy.log('email desabilitado')
    }
}