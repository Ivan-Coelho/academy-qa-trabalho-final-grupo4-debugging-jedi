import { Given, When, Then, Before, After } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import InicioPage from '../../pages/inicial.page'
import DetalhesFilmePage from '../../pages/detalhesFilme.page';
import LoginPage from '../../pages/login.page';


const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();

Before({ tags: '@cadastroFilme' }, function () {

    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
            let userAdmin = dadosAdmin

            cy.wrap(userAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');
        });
    })
});

Before({ tags: '@filmeReviewComum' }, function () {
    let sNota = 0
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
            cy.wrap(dadosAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');
            for (let i = 0; i < 5; i++) {
                cy.usuarioLogado().then(function (dadosComum) {
                    cy.criarReview(response.body.id, dadosComum.token).then(function (review) {
                        let nota = review.score

                        sNota = sNota + nota
                        cy.inativarConta(dadosComum.token);
                        cy.wrap(sNota).as('somaNota');
                    });
                });
            }
        });
    });
});

Before({ tags: '@filmeReviewCritico' }, function () {
    let sNota = 0

    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
            cy.wrap(dadosAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');
            for (let i = 0; i < 5; i++) {
                cy.criarUsuarioCritico().then(function (dadosCritico) {
                    cy.criarReview(response.body.id, dadosCritico.token).then(function (review) {
                        let nota = review.score

                        sNota = sNota + nota
                        cy.inativarConta(dadosCritico.token);
                        cy.wrap(sNota).as('somaNota');
                    });
                });
            }
        });
    })
});

Before({ tags: '@filmeDuasReview' }, function () {
    let sNota = 0
    let user = []
    let nota = []
    let comentario = []
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        cy.cadastrarFilme(dadosAdmin.token).then(function (response) {
            cy.wrap(dadosAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');
            for (let i = 0; i < 2; i++) {
                cy.criarUsuarioCritico().then(function (dadosCritico) {
                    user.push(dadosCritico.nome)
                    cy.criarReview(response.body.id, dadosCritico.token).then(function (review) {
                        nota.push(parseInt(review.score))
                        comentario.push(review.comentario)

                        sNota = sNota + nota
                        cy.inativarConta(dadosCritico.token);
                        cy.wrap(sNota).as('somaNota');
                        cy.wrap(comentario).as('comentario');
                        cy.wrap(nota).as('nota');
                        cy.wrap(user).as('usuario')

                    });
                });
            }
        });
    })

})

After({ tags: '@deletar' }, function () {
    cy.get('@userAdmin').then(function (userAdmin) {
        cy.get('@idFilme').then(function (response) {
            cy.deletarFilme(response.body.id, userAdmin.token);
            cy.deletarUsuario(userAdmin.id, userAdmin.token);
        })
    })
})

Given('que usuario não cadastrado acessa o site', function () {

    cy.visit('')
});

Given('que usuário logado acessa o site', function () {
    cy.usuarioLogado().then(function (response) {
        let email = response.email

        cy.visit('/login')
        paginaLogin.typeEmail(email)
        paginaLogin.typeSenha('123456')
        paginaLogin.clickButtonLogin()

    });
});

When('acessa a página de detalhes de um filme', function () {
    cy.intercept('GET', 'api/movies/search?*').as('pesquisa')

    paginaInicial.typeFilme('Star Wars: O Império Contra-Ataca');
    paginaInicial.clickPesquisaFilme();
    cy.wait('@pesquisa')
    paginaInicial.clickFilme();
});

When('informa o id valido de um filme para acessar a pagina do filme', function () {
    cy.get('@idFilme').then(function (response) {
        cy.visit('/movies/' + response.body.id)
    })
})

When('informa o id de um filme {string}', function (id) {
    cy.visit('/movies/' + id)
});

Then('usuário conseguirá ver a página de detalhes do filme', function () {
    cy.contains(paginaDetalhes.nomeFilme, 'Star Wars: O Império Contra-Ataca').and('be.visible');;
    cy.contains(paginaDetalhes.descricaoFilme, 'As forças imperais comandadas por Darth Vader lançam um ataque contra os membros da resistência, que são obrigados a fugir. Enquanto isso, Luke Skywalker tenta encontrar o Mestre Yoda, que poderá ensiná-lo a dominar a Força e torná-lo um cavaleiro Jedi.').and('be.visible');
    cy.contains(paginaDetalhes.anoLancamento, 1980).and('be.visible');
    cy.contains(paginaDetalhes.duracaoFilme, '2h 4m').and('be.visible');
    cy.contains(paginaDetalhes.generoFilme, 'Épico, Aventura, Ficção científica').and('be.visible');
    cy.get(paginaDetalhes.posterFilme).should('exist').and('be.visible');
});

Then('não encontrará nenhum filme', function () {
    cy.get(paginaDetalhes.nomeFilme).should('not.be.visible');
    cy.get(paginaDetalhes.descricaoFilme).should('not.be.visible');
    cy.get(paginaDetalhes.anoLancamento).should('not.be.visible');
    cy.contains(paginaDetalhes.duracaoFilme, '0h 0m');
    cy.get(paginaDetalhes.generoFilme).should('not.be.visible');

});

Then('o usuário não conseguirá interagir com as funcionalidades', function () {
    cy.get(paginaDetalhes.campoReview).should('not.exist');

});

Then('o usuário conseguirá visualizar um totalizador das avaliações', function () {
    cy.get(paginaDetalhes.totalizadorAudienciaV).should('exist').and('be.visible')
    cy.contains(paginaDetalhes.textoAudiencia, 'Avaliação da audiência').and('be.visible')
    cy.contains(paginaDetalhes.numeroAudiencia, 'Nenhuma avaliação').and('be.visible')
    cy.get(paginaDetalhes.totalizadorCriticoV).should('exist').and('be.visible')
    cy.contains(paginaDetalhes.textoCritica, 'Avaliação da crítica').and('be.visible')
    cy.contains(paginaDetalhes.numeroCritica, 'Nenhuma avaliação').and('be.visible')
});

Then('o usuário conseguirá visualizar um totalizador com a média das avaliações de audiência', function () {

    cy.get('@somaNota').then(function (sNota) {

        let media = sNota / 5
        if (sNota % 5 == 0) {
            cy.get(paginaDetalhes.totalizadorAudiencia).should('have.length', media);
        } else {
            media = Math.floor(media)
            cy.get(paginaDetalhes.totalizadorAudiencia).should('have.length', media);
            cy.get(paginaDetalhes.totalizadorAudienciaQ).should('have.length', 1);
        }
    }); cy.contains(paginaDetalhes.numeroAudiencia, '5 avaliações').and('be.visible');

});
//OLHAR ESSE TESTE totalizador ta certo?
Then('o usuário conseguirá visualizar um totalizador com a média das avaliações de críticos', function () {
    cy.get('@somaNota').then(function (sNota) {

        let media = sNota / 5
        if (sNota % 5 == 0) {
            cy.get(paginaDetalhes.totalizadorCritico).should('have.length', media);
        } else {
            media = Math.floor(media);
            cy.get(paginaDetalhes.totalizadorCritico).should('have.length', media);
            cy.get(paginaDetalhes.totalizadorCriticoQ).should('have.length', 1);
        }
    });
    cy.contains(paginaDetalhes.numeroCritica, '5 avaliações').and('be.visible');
})

Then('será permitido criar uma avaliação para o filme', function () {
    cy.contains(paginaDetalhes.textoAvalieFilme, 'Avalie este filme');
    cy.get(paginaDetalhes.inputReview).should('be.enabled');
    cy.get(paginaDetalhes.buttonEnviar).should('be.enabled').and('be.visible');
    cy.get(paginaDetalhes.estrelaAvaliacao).should('be.visible');
});

Then('as funcionalidades de criação de review estará desabilitada', function () {
    cy.get(paginaDetalhes.inputReview).should('be.disabled');
    cy.get(paginaDetalhes.estrelaAvaliacaoD).should('be.visible');

});

Then('o sistema solicitará ao usuario para realizar o login', function () {
    cy.contains(paginaDetalhes.buttonLoginAva, 'Entre para poder escrever sua review');
    paginaDetalhes.clickButtonLogin();
    cy.url().should('equal', 'https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/login');
});

Then('o usuário conseguirá visualizar todas as avaliações registradas para o filme', function () {

    cy.get(paginaDetalhes.totalReviewUsuarios).should('have.length', '5');
});

Then('o usuário conseguirá visualizar todas as informações relevantes das avaliações do filme', function () {
    cy.wait(1000)
    cy.get('@comentario').then(function (comentario) {
        cy.get('@nota').then(function (nota) {
            cy.get('@usuario').then(function (user) {

                cy.contains(paginaDetalhes.nomeUsuario1, user[0])
                cy.contains(paginaDetalhes.comentarioUsuario1, comentario[0])
                cy.get(paginaDetalhes.notausuario1).should('have.length', nota[0])
                cy.get(paginaDetalhes.datausuario1).should('be.visible')
                cy.contains(paginaDetalhes.nomeUsuario2, user[1])
                cy.contains(paginaDetalhes.comentarioUsuario2, comentario[1])
                cy.get(paginaDetalhes.notausuario2).should('have.length', nota[1])
                cy.get(paginaDetalhes.datausuario2).should('be.visible')
            });
        });
    });



});

Then('limpar a base', function () {

    for (let i = 0; i < 500; i++) {
        cy.buscarFilme('Star Wars').then(function (id) {
            cy.get('@userAdmin').then(function (userAdmin) {
                cy.deletarFilme(id, userAdmin.token);

            })
        })
    }


})