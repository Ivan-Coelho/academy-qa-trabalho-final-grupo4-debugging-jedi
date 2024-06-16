import {
  Given,
  When,
  Then
} from "@badeball/cypress-cucumber-preprocessor";
import { faker } from "@faker-js/faker";

import InicioPage from "../../pages/inicial.page";
import LoginPage from "../../pages/login.page";

const paginaInicial = new InicioPage();
const paginaLogin = new LoginPage();

let filme;
let usuarioAdmin;
let tituloSplit;

beforeEach({ tags: '@cadastroFilme' }, function () {
    cy.criarUsuarioAdmin().then(function (dadosAdmin) {
        usuarioAdmin = { ...dadosAdmin };
        const anoAtual = new Date().getFullYear();
        const filmeObj = {
            title: `${faker.lorem.words(3)} : ${faker.lorem.words(1)}`,
            genre: faker.lorem.words(3),
            description: faker.lorem.words(20),
            durationInMinutes: Math.floor(Math.random() * (140 - 100 + 1)) + 100,
            releaseYear: Math.floor(Math.random() * (anoAtual - 1895 + 1)) + 1895,
        };
        
        cy.cadastrarFilmeComBody(dadosAdmin.token, filmeObj).then(function (response)  {
            filme = { ...response.body };
            tituloSplit = filme.title.split(" "); 
        });
    })
}); 

afterEach({ tags: "@deletar" }, function () {
  cy.deletarFilme(filme.id, usuarioAdmin.token);
  cy.deletarUsuario(usuarioAdmin.id, usuarioAdmin.token);
});

Given("que o usuário acessou  a pagina inicial", function () { 
    cy.visit("");
});

Given("que um usuário logado acessou o site", function () {
  cy.usuarioLogado().then(function (response) {
    let email = response.email;

    cy.visit("/login");
    paginaLogin.typeEmail(email);
    paginaLogin.typeSenha("123456");
    paginaLogin.clickButtonLogin();
  });
});

When("inserir o título completo do filme na barra de pesquisa", function () {
  paginaInicial.typeFilme(filme.title);
});

When("acionar o recurso de buscar", function () {
  paginaInicial.clickPesquisaFilme();
});

When(
  "inserir apenas uma parte do título do filme na caixa de pesquisa",
  function () {
    const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}`;
    paginaInicial.typeFilme(tituloParcial);
  }
);

When("inserir um título com um erro de digitação", function () {
    let filmeNomeIncorreto = `${filme.title} nome errado`;
  paginaInicial.typeFilme(filmeNomeIncorreto);
});

Then(
  "o sistema deve exibir uma mensagem de alerta: Nenhum filme encontrado",
  function () {
    cy.get("p").contains("Nenhum filme encontrado").should("be.visible");
  }
);

When("inserir o título do filme com letras maiúsculas", function () {
  paginaInicial.typeFilme(filme.title.toUpperCase());
});

When("inserir o título do filme com letras minúsculas", function () {
  paginaInicial.typeFilme(filme.title.toLowerCase());
});

When(
  "inserir o título do filme com letras maiúsculas e minúsculas misturadas",
  function () {
    const tituloParcial = `${tituloSplit[0].toUpperCase()} ${tituloSplit[1].toLowerCase()}`;
    paginaInicial.typeFilme(tituloParcial);
  }
);

When(
  "inserir um título que não corresponde a nenhum filme cadastrado",
  function () {
    const tituloNovo = faker.lorem.words(10);
    paginaInicial.typeFilme(tituloNovo);
  }
);

When(
  "inserir um título com caracteres especiais na caixa de pesquisa",
  function () {
    
    const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]} ${tituloSplit[2]}`;
    paginaInicial.typeFilme(tituloParcial);
  }
);

When(
  "inserir um título muito curto, como uma única letra na caixa de pesquisa",
  function () {
    paginaInicial.typeFilme("S");
  }
);

Then(
  "o sistema deve retornar todos os filmes que contêm a letra inserida no título",
  function () {
    cy.get(".search-movie-container").contains("S").should("be.visible");
  }
);

When(
  "inserir um título com espaços extras antes ou depois do texto",
  function () {
    let nomeFilme = `  ${filme.title}  `
    paginaInicial.typeFilme(nomeFilme);
  }
);

Then(
  "o sistema deve ignorar os espaços extras e retornar o filme correspondente ao título correto.",
  function () {
    const tituloParcial = `${tituloSplit[0]} ${tituloSplit[1]}`;
    cy.get(".movie-card-footer > .movie-title")
      .first()
      .contains(tituloParcial)
      .should("be.visible");
  }
);

Given("que um usuário não logado acessou  a pagina inicial", function () {
  cy.visit("");
});

When("inserir um título de filme na caixa de pesquisa", function () {
  paginaInicial.typeFilme(filme.title);
});

Then(
  "o sistema deve retornar o filme correspondente ao título inserido.",
  function () {
    const tituloParcial = `${tituloSplit[0]}`;
    cy.get(".movie-card-footer > .movie-title")
      .first()
      .contains(tituloParcial)
      .should("be.visible");
  }
);
