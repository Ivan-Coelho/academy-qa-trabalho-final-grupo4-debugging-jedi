import { Given, When, Then, Before, After} from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

import InicioPage from '../../pages/inicial.page'
import DetalhesFilmePage from '../../pages/detalhesFilme.page';
import LoginPage from'../../pages/login.page';


const paginaInicial = new InicioPage();
const paginaDetalhes = new DetalhesFilmePage();
const paginaLogin = new LoginPage();

Before({tags: '@cadastroFilme'}, function(){
    
    cy.criarUsuarioAdmin().then(function(dadosAdmin){        
        cy.cadastrarFilme(dadosAdmin.token).then(function(response){
            let userAdmin = dadosAdmin
            
            cy.wrap(userAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');
        });
    })
});

Before({tags: '@cadastroFilmeReview'}, function(){
    
    cy.criarUsuarioAdmin().then(function(dadosAdmin){        
        cy.cadastrarFilme(dadosAdmin.token).then(function(response){
            cy.usuarioLogado().then(function(dadosComum1){
                cy.usuarioLogado().then(function(dadosComum2){
                    cy.criarReview(response.body.id, dadosComum1.token).then(function(review1){
                        let nota1 = review1.score

                        cy.criarReview(response.body.id, dadosComum2.token).then(function(){});
                    })
                        

                })
                
                

            
            cy.wrap(userAdmin).as('userAdmin');
            cy.wrap(response).as('idFilme');


            })
            
        });
    })
});


After({tags: '@deletar'}, function(){
    cy.get('@userAdmin').then(function(userAdmin){
        cy.get('@idFilme').then(function(response){
            cy.deletarFilme(response.body.id, userAdmin.token);
            cy.deletarUsuario(userAdmin.id, userAdmin.token);
        })
    })    
})

Given('que usuario não cadastrado acessa o site', function(){    
    
    cy.visit('')
});

Given('que usuário logado acessa o site', function(){
    cy.usuarioLogado().then(function(response){
        let email = response.email
        
        cy.visit('/login')
        paginaLogin.typeEmail(email)
        paginaLogin.typeSenha('123456')
        paginaLogin.clickButtonLogin()        

    });
});

When('acessa a página de detalhes de um filme', function(){        
    cy.intercept('GET', 'api/movies/search?*').as('pesquisa')
    
    paginaInicial.typeFilme('Star Wars: O Império Contra-Ataca');
    paginaInicial.clickPesquisaFilme();
    cy.wait('@pesquisa')   
    paginaInicial.clickFilme();
})

When('informa o id valido de um filme', function(){
    cy.get('@idFilme').then(function(response){
        cy.visit('/movies/'+ response.body.id)
    })
})

When('informa o id de um filme {string}', function(id){    
    cy.visit('/movies/'+ id)    
})

Then('usuário conseguirá ver a página de detalhes do filme', function(){
    cy.contains(paginaDetalhes.nomeFilme, 'Star Wars: O Império Contra-Ataca');
    cy.contains(paginaDetalhes.descricaoFilme, 'As forças imperais comandadas por Darth Vader lançam um ataque contra os membros da resistência, que são obrigados a fugir. Enquanto isso, Luke Skywalker tenta encontrar o Mestre Yoda, que poderá ensiná-lo a dominar a Força e torná-lo um cavaleiro Jedi.');
    cy.contains(paginaDetalhes.anoLancamento, 1980);
    cy.contains(paginaDetalhes.duracaoFilme, '2h 4m');
    cy.contains(paginaDetalhes.generoFilme, 'Épico, Aventura, Ficção científica');
    cy.get(paginaDetalhes.posterFilme).should('exist');
});

Then('não encontrará nenhum filme', function(){
    cy.get(paginaDetalhes.nomeFilme).should('not.be.visible');
    cy.get(paginaDetalhes.descricaoFilme).should('not.be.visible');
    cy.get(paginaDetalhes.anoLancamento).should('not.be.visible');
    cy.contains(paginaDetalhes.duracaoFilme, '0h 0m');
    cy.get(paginaDetalhes.generoFilme).should('not.be.visible');

});


Then('o usuário não conseguirá interagir com as funcionalidades', function(){    
    cy.get(paginaDetalhes.campoReview).should('not.exist');
        
}); 

Then('o usuário conseguirá visualizar um totalizador das avaliações', function(){    
    cy.get(paginaDetalhes.totalizadorAudiencia).should('exist')
    cy.contains(paginaDetalhes.textoAudiencia, 'Avaliação da audiência')
    cy.contains(paginaDetalhes.numeroAudiencia, 'Nenhuma avaliação')
    cy.get(paginaDetalhes.totalizadorCritico).should('exist')
    cy.contains(paginaDetalhes.textoCritica, 'Avaliação da crítica')
    cy.contains(paginaDetalhes.numeroCritica, 'Nenhuma avaliação')        
}); 

Then('o usuário conseguirá visualizar um totalizador com a média das avaliações de audiência', function(){
    
})