#language: pt

Funcionalidade: Listagem de filmes

    Cenário: Deve ser possível um usuário não logado consultar a lista de filmes
        Dado que um usuário não logado acessou a página inicial
        Quando ele requisitar a opção filmes
        Então deve ser possivél visualizar as informações sumarizadas de filmes

    Cenário: Deve ser possível um usuário comum consultar a lista de filmes
        Dado que um usuário comum acessou página inicial
        Quando ele requisitar a opção filmes
        Então deve ser possivél visualizar as informações sumarizadas de filmes

    Cenário: Deve ser possível um usuário admin consultar a lista de filmes
        Dado que um usuário admin acessou página inicial
        Quando ele requisitar a opção filmes
        Então deve ser possivél visualizar as informações sumarizadas de filmes

    Cenário: Deve ser possível vizualizar filmes listados por nota (mais avaliados para menos avaliados)
        Dado que um usuário acessou a página inicial
        Quando ele requisitar a opção filmes
        Então deverá haver uma opção de visualizar filmes mais bem avaliados

    Cenário: Deve ser possível realizar a paginação para explorar os filmes cadastrados
        Dado que um usuário acessou a página inicial
        Quando ele requisitar a opção filmes
        Então deverá existir a opção de paginação para explorar os filmes da lista

