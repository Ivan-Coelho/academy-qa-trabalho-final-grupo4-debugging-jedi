import { Given, When, Then  } from '@badeball/cypress-cucumber-preprocessor';

import RegistroUsuarioPage  from '../page/registroUsuario.page'

import { faker } from '@faker-js/faker';

const paginaRegistroUsuario = new RegistroUsuarioPage();


Given('que acessei a pagina de registro de usuario', function () {
    cy.visit('/register');
}); 
When('nao informar um novo nome', function (){
});
When('informar um novo email', function (){
    var email = faker.internet.email().toLowerCase();
    paginaRegistroUsuario.digitarEmail(email)

}); 
When('informar uma nova senha', function (){
    paginaRegistroUsuario.digitarSenha('123456')
});
When('confirmar a senha', function (){
    paginaRegistroUsuario.confirmarSenha('123456')
});
When('confirmar a operação', function (){
    paginaRegistroUsuario.clicarBotaoCadastrar()
});
Then('aparecera a mensagem de erro', function (){
    cy.contains(paginaRegistroUsuario.mensagemInformarNome, 'Informe o nome').should('be.visible')
});


When('informar um novo nome', function (){
    var nome = faker.person.fullName();
    paginaRegistroUsuario.digitarNome(nome)
});
When('nao informar um novo email', function (){
}); 
Then('aparecera a mensagem', function (){
    cy.contains(paginaRegistroUsuario.mensagemInformarEmail, 'Informe o e-mail').should('be.visible');
});

When('nao informar uma nova senha', function (){
});
Then('aparecerao as mensagens', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro, 'Informe a senha').should('be.visible');
    cy.contains(paginaRegistroUsuario.mensagemSenhasIguais, 'As senhas devem ser iguais').should('be.visible');
});

When('nao confirmar a senha', function (){
});
Then('aparecera uma mensagem', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro, 'Informe a senha').should('be.visible');
});

When('informar um novo nome com mais de 100 caracteres', function (){
    paginaRegistroUsuario.digitarNome('Jose Francisco Felisbino Serafim Constancios Rafael Hugo da Silva Ferreira Figueiroa Castros Saraivas')
});

Then('a mensagem aparecera', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro, 'O nome deve ter no máximo 100 dígitos').should('be.visible');
});

When('informar um novo email com 61 caracteres', function (){
    paginaRegistroUsuario.digitarEmail('Jose Francisco Felisbino Serafim Constancios Rafael Hugo da Silva Ferreira Figueiroa Castros Saraivas')
});

Then('uma mensagem aparecera', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro,"O e-mail deve ter no máximo 60 dígitos").should('be.visible');
});

When('informar um novo email com formato invalido', function (){
    paginaRegistroUsuario.digitarEmail('adairjosefrancisco@.com')
});

Then('aparecera uma mensagem de alerta', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro,"Informe um e-mail válido.").should('be.visible');
});

When('informar uma senha contendo 5 caracteres', function (){
    paginaRegistroUsuario.digitarSenha('12345')
});

Then('vai aparecer o alerta', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro,"A senha deve ter pelo menos 6 dígitos").should('be.visible');
});

When('informar uma nova senha contendo 13 caracteres', function (){
    paginaRegistroUsuario.digitarSenha('1234567890asd')
});

Then('uma mensagem de alerta vai aparecer', function (){
    cy.contains(paginaRegistroUsuario.mensagemErro,"A senha deve ter no máximo 12 dígitos").should('be.visible');
});

When('informar nome com 1 letra', function (){
    paginaRegistroUsuario.digitarNome('M')
});
Then('o usuario sera cadastrado', function (){
    cy.contains(paginaRegistroUsuario.mensagemSucesso,"Sucesso").should('be.visible');
});

When('informar um novo nome contendo 99 letras', function (){
    paginaRegistroUsuario.digitarNome('Maria Joaquina Francisca Rafaela Barbara Ana Paula Mariana Sauros Leites Oliveiras Rezende Antunes')
});

When('informar um novo nome com 100 letras', function (){
    paginaRegistroUsuario.digitarNome('Joaquina Salve Francisca Rafaela Barbara Ana Paula Marianas Sauros Leites Oliveiras Rezende Antunes')
});

When('informar um novo nome com caracteres especiais', function (){
    paginaRegistroUsuario.digitarNome('*#$ Thullius')
});

When('informar um novo email com 59 caracteres', function (){
    paginaRegistroUsuario.digitarEmail('thulliuscarloseduaardsosarthsurssaulosilvioas@yahoo.com.br')
});

When('informar um novo email 60 caracteres', function (){
    paginaRegistroUsuario.digitarEmail('saulodanielsamuelrafaeldeoliveirareisantunesilva@hotmail.com')
});

When('informar uma nova senha com caracteres especiais', function (){
    paginaRegistroUsuario.digitarSenha('!@#$%*')
});
When('confirmar a nova senha', function (){
    paginaRegistroUsuario.confirmarSenha('!@#$%*')
});

When('informar uma nova senha 6 caracteres', function (){
    paginaRegistroUsuario.digitarSenha('456789')
});
When('confirmar a senha de 6 caracteres', function (){
    paginaRegistroUsuario.confirmarSenha('456789')
});

When('informar uma nova senha 7 caracteres', function (){
    paginaRegistroUsuario.digitarSenha('4567892')
});
When('confirmar a senha de 7 caracteres', function (){
    paginaRegistroUsuario.confirmarSenha('4567892')
});

When('informar uma nova senha 11 caracteres', function (){
    paginaRegistroUsuario.digitarSenha('12345678912')
});
When('confirmar a senha de 11 caracteres', function (){
    paginaRegistroUsuario.confirmarSenha('12345678912')
});

When('informar uma nova senha 12 caracteres', function (){
    paginaRegistroUsuario.digitarSenha('123456789123')
});
When('confirmar a senha de 12 caracteres', function (){
    paginaRegistroUsuario.confirmarSenha('123456789123')
});

When('informar uma nova senha com letras', function (){
    paginaRegistroUsuario.digitarSenha('nome123')
});
When('confirmar a senha com letras', function (){
    paginaRegistroUsuario.confirmarSenha('nome123')
});