// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from "@faker-js/faker";
// validar as URL
Cypress.Commands.add("criarUsuario", function () {
  let user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
  cy.request({
    method: "POST",
    url: "/users",
    body: user,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add("usuarioLogado", function () {
  let user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
  let tokenComum;
  let usuario;

  cy.request({
    method: "POST",
    url: "/users",
    body: user,
  }).then(function (response) {
    usuario = response.body;

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: usuario.email,
        password: "123456",
      },
    })
      .then(function (response) {
        tokenComum = response.body.accessToken;
      })
      .then(function () {
        return {
          nome: user.name,
          email: user.email,
          id: usuario.id,
          token: tokenComum,
        };
      });
  });
});

Cypress.Commands.add("criarUsuarioAdmin", function () {
  let user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
  let usuario;
  let tokenAdmin;

  cy.request({
    method: "POST",
    url: "/users",
    body: user,
  }).then(function (response) {
    usuario = response.body;

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: usuario.email,
        password: "123456",
      },
    }).then(function (response) {
      tokenAdmin = response.body.accessToken;

      cy.request({
        method: "PATCH",
        url: "/users/admin",
        headers: { Authorization: "Bearer " + tokenAdmin },
      }).then(function () {
        return {
          nome: user.name,
          id: usuario.id,
          token: tokenAdmin,
          email: user.email,
        };
      });
    });
  });
});

Cypress.Commands.add("deletarUsuario", function (idUsuario, tokenAdmin) {
  cy.request({
    method: "DELETE",
    url: "/users/" + idUsuario,
    headers: { Authorization: "Bearer " + tokenAdmin },
  });
});

Cypress.Commands.add("criarUsuarioCritico", function () {
  let user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
  let usuario;
  let tokenCritico;

  cy.request({
    method: "POST",
    url: "/users",
    body: user,
  }).then(function (response) {
    usuario = response.body;

    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email: usuario.email,
        password: "123456",
      },
    }).then(function (response) {
      tokenCritico = response.body.accessToken;

      cy.request({
        method: "PATCH",
        url: "/users/apply",
        headers: { Authorization: "Bearer " + tokenCritico },
      }).then(function () {
        return {
          id: usuario.id,
          token: tokenCritico,
          email: user.email,
          nome: user.name,
        };
      });
    });
  });
});

Cypress.Commands.add("cadastrarFilme", function (tokenAdmin) {
  cy.fixture("filmes/bodyFilme.json").then(function (arquivo) {
    cy.request({
      method: "POST",
      url: "https://raromdb-3c39614e42d4.herokuapp.com/api/movies",
      headers: { Authorization: "Bearer " + tokenAdmin },
      body: arquivo,
    }).then(function (response) {
      return response;
    });
  });
});

Cypress.Commands.add("buscarFilme", function (titulo) {
  let idFilme;
  return cy
    .request({
      method: "GET",
      url: "/movies/search",
      qs: { title: titulo },
    })
    .then(function (response) {
      return (idFilme = response.body[0].id);
    });
});

Cypress.Commands.add("deletarFilme", function (idFilme, tokenAdmin) {
  cy.request({
    method: "DELETE",
    url: "movies/" + idFilme,
    headers: { Authorization: "Bearer " + tokenAdmin },
  });
});

Cypress.Commands.add("criarReview", function (idFilme, token) {
  let comentario = faker.lorem.lines(1);
  let nota = faker.number.int({ min: 1, max: 5 });

  cy.request({
    method: "POST",
    url: "users/review",
    body: {
      movieId: idFilme,
      score: nota,
      reviewText: comentario,
    },
    headers: { Authorization: "Bearer " + token },
  }).then(function () {
    return {
      score: nota,
      comentario: comentario,
    };
  });
});

Cypress.Commands.add("inativarConta", function (token) {
  cy.request({
    method: "PATCH",
    url: "users/inactivate",
    headers: { Authorization: "Bearer " + token },
  });
});

Cypress.Commands.add("buscaFilmeId", function (idFilme) {
  cy.request({
    method: "GET",
    url: "/movies/" + idFilme,
  }).then(function (response) {
    return response.body;
  });
});

Cypress.Commands.add("listarUsuario", function (tokenAdmin) {
  cy.request({
    method: "GET",
    url: "/users",
    headers: { Authorization: "Bearer " + tokenAdmin },
  });
});
Cypress.Commands.add("listarUsuarioId", function (idUsuario, tokenAdmin) {
  cy.request({
    method: "GET",
    url: "/users/" + idUsuario,
    headers: { Authorization: "Bearer " + tokenAdmin },
  });
});

Cypress.Commands.add("listarReview", function (token) {
  cy.request({
    method: "GET",
    url: "users/review/all",
    headers: { Authorization: "Bearer " + token },
  });
});

Cypress.Commands.add("cadastrarFilmeComBody", function (tokenAdmin, body) {
  cy.request({
    method: "POST",
    url: "/movies",
    headers: { Authorization: "Bearer " + tokenAdmin },
    body: body,
  }).then(function (response) {
    return {
      id: response.body.id,
      title: response.body.title,
      genre: response.body.genre,
      description: response.body.description,
      durationInMinutes: response.body.durationInMinutes,
      releaseYear: response.body.releaseYear,
    };
  });
});

Cypress.Commands.add("atualizarFilme", function (tokenAdmin, id, body) {
  cy.request({
    method: "PUT",
    url: `/movies/${id}`,
    headers: { Authorization: "Bearer " + tokenAdmin },
    failOnStatusCode: false,
    body: body,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add(
  "buscarFilmeResponseCompleto",
  function (titulo, token = null) {
    return cy
      .request({
        method: "GET",
        url: "/movies/search",
        headers: { Authorization: "Bearer " + token },
        qs: { title: titulo },
      })
      .then(function (response) {
        return response;
      });
  }
);

Cypress.Commands.add("buscarListaFilme", function (token = null, sort = false) {
  return cy
    .request({
      method: "GET",
      url: "/movies",
      headers: { Authorization: "Bearer " + token },
      qs: { sort: sort },
    })
    .then(function (response) {
      return response;
    });
});

Cypress.Commands.add(
  "criarReviewCompleto",
  function (idFilme, score, reviewText, token) {
    cy.request({
      method: "POST",
      url: "users/review",
      failOnStatusCode: false,
      body: {
        movieId: idFilme,
        score: score,
        reviewText: reviewText,
      },
      headers: { Authorization: "Bearer " + token },
    }).then(function (response) {
      return response;
    });
  }
);

Cypress.Commands.add("login", (usuario) => {
  cy.request({
    method: "POST",
    url: "/auth/login",
    body: {
      email: usuario.email,
      password: usuario.password
    },
  })
})

Cypress.Commands.add("evoluirCritico", function (token) {
  cy.request({
    method: "PATCH",
    url: "/users/apply",
    headers: { Authorization: "Bearer " + token },
  });
});

Cypress.Commands.add("evoluirAdministrador", function (token) {
  cy.request({
    method: "PATCH",
    url: "/users/admin",
    headers: { Authorization: "Bearer " + token },
  });
});

Cypress.Commands.add('autenticarUsuario',function(email, password ){
  cy.request({
      method: 'POST',
      url: '/auth/login',
      body: { 
          email: email,
          password: password
      }
  }).then(function (response) {
      return response
  })
});

Cypress.Commands.add('inativarUsuario',function (token){
  cy.request({
      method: 'PATCH',
      url: '/users/inactivate',
      headers: {Authorization: 'Bearer '+ token}
  }).then(function (response) {
      return response
  })
});

Cypress.Commands.add("cadastrarFilmeComBody", function (tokenAdmin, body) {
  cy.request({
    method: "POST",
    url: "/movies",
    headers: { Authorization: "Bearer " + tokenAdmin },
    body: body,
  }).then(function (response) {
    return {
      id: response.body.id,
      title: response.body.title,
      genre: response.body.genre,
      description: response.body.description,
      durationInMinutes: response.body.durationInMinutes,
      releaseYear: response.body.releaseYear,
    };
  });
});

Cypress.Commands.add("atualizarFilme", function (tokenAdmin, id, body) {
  cy.request({
    method: "PUT",
    url: `/movies/${id}`,
    headers: { Authorization: "Bearer " + tokenAdmin },
    failOnStatusCode: false,
    body: body,
  }).then(function (response) {
    return response;
  });
});

Cypress.Commands.add(
  "buscarFilmeResponseCompleto",
  function (titulo, token = null) {
    return cy
      .request({
        method: "GET",
        url: "/movies/search",
        headers: { Authorization: "Bearer " + token },
        qs: { title: titulo },
      })
      .then(function (response) {
        return response;
      });
  }
);

Cypress.Commands.add("buscarListaFilme", function (token = null, sort = false) {
  return cy
    .request({
      method: "GET",
      url: "/movies",
      headers: { Authorization: "Bearer " + token },
      qs: { sort: sort },
    })
    .then(function (response) {
      return response;
    });
});

Cypress.Commands.add(
  "criarReviewCompleto",
  function (idFilme, score, reviewText, token) {
    cy.request({
      method: "POST",
      url: "users/review",
      failOnStatusCode: false,
      body: {
        movieId: idFilme,
        score: score,
        reviewText: reviewText,
      },
      headers: { Authorization: "Bearer " + token },
    }).then(function (response) {
      return response;
    });
  }
);

Cypress.Commands.add("login", (infoUsuario) => {
  cy.request({
    method: "POST",
    url: "/auth/login",
    body: {
      email: infoUsuario.email,
      password: infoUsuario.password
    },
  })
})

Cypress.Commands.add("evoluirCritico", function (token) {
  cy.request({
    method: "PATCH",
    url: "/users/apply",
    headers: { Authorization: "Bearer " + token },
  });
});

Cypress.Commands.add("evoluirAdministrador", function (token) {
  cy.request({
    method: "PATCH",
    url: "/users/admin",
    headers: { Authorization: "Bearer " + token },
  });
});

Cypress.Commands.add('autenticarUsuario',function(email, password ){
  cy.request({
      method: 'POST',
      url: '/auth/login',
      body: { 
          email: email,
          password: password
      }
  }).then(function (response) {
      return response
  })
});

Cypress.Commands.add('inativarUsuario',function (token){
  cy.request({
      method: 'PATCH',
      url: '/users/inactivate',
      headers: {Authorization: 'Bearer '+ token}
  }).then(function (response) {
      return response
  })
})
Cypress.Commands.add("criarUsuarioResponse", function () {
  let user = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: "123456",
  };
  cy.request({
    method: "POST",
    url: "/users",
    body: user,
  }).then(function (response) {
    let criado ={
      ...user,
      ...response.body,
      response : response,
    };
    return criado;
  });
});

Cypress.Commands.add("deletarUsuarioResponse", (usuario) => {
  let token;
  const conteudo = {
    email: usuario.email,
    password: usuario.password,
    id: usuario.id,
  };

  return cy.login(conteudo).then((response) => {
    token = response.body.accessToken;
    return cy.criarUsuarioAdmin(token).then(function () {
      return cy.request({
        method: "DELETE",
        url: apiUrl + "/users/" + conteudo.id,
        auth: {
          bearer: token,
        },
      });
    });
  });
});

Cypress.Commands.add("admin", function (token) {
  return cy.request({
    method: "PATCH",
    url: "/users/admin",
    auth: {
      bearer: token,
    },
  });
});
