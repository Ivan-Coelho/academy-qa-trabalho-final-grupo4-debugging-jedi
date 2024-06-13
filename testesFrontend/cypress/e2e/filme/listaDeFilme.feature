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

# REVISITAR E EXCLUIR OS CENÁRIO OCULTOS QUE NÃO FOREM SER USADOS

# Dado que um usuário não logado acessou a funcionalidade de listagem de filmes
# Quando ele visualizar a lista de filmes
# Então o sistema deve exibir as informações sumarizadas de todos os filmes cadastrados

# Cenário: Deve ser possível um usuário comum consultar a lista de filmes
# Dado que um usuário comum acessou a funcionalidade de listagem de filmes
# Quando ele visualizar a lista de filmes
# Então o sistema deve exibir as informações sumarizadas de todos os filmes cadastrados 

# Cenário: Deve ser possível um usuário crítico consultar a lista de filmes
# Dado que um usuário crítico acessou a funcionalidade de listagem de filmes
# Quando ele visualizar a lista de filmes
# Então o sistema deve exibir as informações sumarizadas de todos os filmes cadastrados 

# Cenário: Deve ser possível um usuário administrador consultar a lista de filmes
# Dado que um usuário administrador acessou a funcionalidade de listagem de filmes
# Quando ele visualizar a lista de filmes
# Então o sistema deve exibir as informações sumarizadas de todos os filmes cadastrados

# Cenário: Deve ser possível visualizar o título de um filme ao listar filmes
# Dado que um usuário acessou a página inicial
# Quando ele selecionar a opção filmes
# Então o card de um filme deverá conter o título do mesmo

# Cenário: Deve ser possível visualizar a descrição de um filme listado
# Dado que um usuário acessou a página inicial
# Quando ele selecionar a opção filmes
# Então o card de um filme deverá conter a descrição correspondente ao mesmo

# Cenário: Deve ser possível visualizar a nota de um filme listado
# Dado que um usuário acessou a página inicial
# Quando ele selecionar a opção filmes
# Então o card de um filme deverá conter a sua nota geral

# Cenário: Deve ser possível vizualizar filmes listados por ordem de cadastro
# Dado que um usuário acessou a página inicial
# Quando ele selecionar a opção filmes
# Então os filmes cadastrados deverão ser listados conforme sua ordem de cadastro

# Cenário: Deve ser possível vizualizar filmes listados por nota (mais avaliados para menos avaliados)
# Dado que um usuário acessou a página inicial
# Quando ele selecionar a opção filmes
# Então deverá haver uma opção de visualizar filmes mais bem avaliados

# Cenário: Deve ser possível realizar a paginação para explorar os filmes cadastrados
# Dado que um usuário acessou a lista de filmes
# Quando houver mais de 5 filmes cadastrados
# Então deverá existir a opção de paginação para explorar os filmes da lista