#language: pt

Funcionalidade: Pesquisa de filmes


Cenário: Deve ser possível pesquisar um filme pelo título completo
Dado que o usuário acessou  a pagina inicial 
Quando inserir o título completo do filme na barra de pesquisa
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título completo

Cenário: Deve ser possível pesquisar um filme com título parcial
Dado que o usuário acessou  a pagina inicial 
Quando inserir apenas uma parte do título do filme na caixa de pesquisa
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título completo

Cenário: Não deve ser possível pesquisar um filme com erro de digitação
Dado que o usuário acessou  a pagina inicial 
Quando inserir um título com um erro de digitação
E acionar o recurso de buscar
Então o sistema deve exibir uma mensagem de alerta: Nenhum filme encontrado

Cenário: Deve ser possível pesquisar um filme com letras maiúsculas
Dado que o usuário acessou  a pagina inicial 
Quando inserir o título do filme com letras maiúsculas
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título completo

Cenário: Deve ser possível pesquisar um filme com letras minúsculas
Dado que o usuário acessou  a pagina inicial 
Quando inserir o título do filme com letras minúsculas
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título completo

Cenário: Deve ser possível pesquisar um filme com letras maiúsculas e minúsculas misturadas
Dado que o usuário acessou  a pagina inicial 
Quando inserir o título do filme com letras maiúsculas e minúsculas misturadas
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título completo

Cenário: Não deve ser possível pesquisar um filme com título inexistente
Dado que o usuário acessou  a pagina inicial
Quando inserir um título que não corresponde a nenhum filme cadastrado
E acionar o recurso de buscar
Então o sistema deve exibir uma mensagem de alerta: Nenhum filme encontrado

Cenário: Deve ser possível pesquisar um filme que contenha caracteres especiais no título
Dado que o usuário acessou  a pagina inicial
Quando inserir um título com caracteres especiais na caixa de pesquisa
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título completo

Cenário: Deve ser possível pesquisar com um título muito curto 
Dado que o usuário acessou  a pagina inicial
Quando inserir um título muito curto, como uma única letra na caixa de pesquisa
E acionar o recurso de buscar
Então o sistema deve retornar todos os filmes que contêm a letra inserida no título

Cenário: Deve ser possível pesquisar um filme com espaços extras no título
Dado que o usuário acessou  a pagina inicial
Quando inserir um título com espaços extras antes ou depois do texto
E acionar o recurso de buscar
Então o sistema deve ignorar os espaços extras e retornar o filme correspondente ao título correto.

Cenário: Deve ser possível um usuário não logado no sistema realizar pesquisas no catálogo de filmes
Dado que um usuário não logado acessou  a pagina inicial
Quando inserir um título de filme na caixa de pesquisa
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título inserido.

Cenário: Deve ser possível um usuário logado no sistema realizar pesquisas no catálogo de filmes
Dado que um usuário logado acessou o site
Quando inserir um título de filme na caixa de pesquisa
E acionar o recurso de buscar
Então o sistema deve retornar o filme correspondente ao título inserido.

# Cenário: Deve ser possível visualizar uma imagem de capa do filme encontrado 
# Dado que o usuário inseriu um título na caixa de pesquisa,
# Quando selecionar o recurso de pesquisar,
# Então o sistema deverá retornar o filme correspondente e uma imagem de capa que o represente.

# Cenário: Deve ser possível visualizar a descrição contida no súmario do filme encontrado
# Dado que o usuário acessou  a pagina inicial
# Quando inserir o título completo do filme na barra de pesquisa
# E acionar o recurso de buscar
# Então o sistema deverá retornar as informações contidas na descrição do filme selecionado.

# Cenário: Deve ser possível visualizar a nota do filme encontrado
# Dado que o usuário encontrou um filme pesquisado,
# Quando selecionar o filme encontrado,
# Então o sistema deverá retornar as informações referente a nota de avaliação do filme retornado.

# Cenário: Deve ser possível um usuário comum realizar uma pesquisa no catálogo de filmes
# Dado que um usuário comum inseriu um título de filme na caixa de pesquisa,
# Quando acionar o recurso de buscar,
# Então o sistema deve retornar o filme correspondente ao título inserido.

# Cenário: Deve ser possível um usuário crítico  realizar uma pesquisa no catálogo de filmes
# Dado que um usuário crítico inseriu um título de filme na caixa de pesquisa,
# Quando acionar o recurso de buscar,
# Então o sistema deve retornar o filme correspondente ao título inserido.

# Cenário: Deve ser possível um usuário administrador realizar uma pesquisa no catálogo de filmes
# Dado que um usuário administrador inseriu um título de filme na caixa de pesquisa,
# Quando acionar o recurso de buscar,
# Então o sistema deve retornar o filme correspondente ao título inserido.