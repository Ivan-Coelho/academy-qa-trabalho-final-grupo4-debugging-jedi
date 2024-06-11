# language: pt


Funcionalidade: Consulta de detalhes de filmes 

# @cadastroFilme @deletar
# Cenário: usuário não logado deve conseguir acessar os detalhes dos filmes registrados no catálogo
#     Dado que usuario não cadastrado acessa o site 
#     Quando acessa a página de detalhes de um filme
#     Então usuário conseguirá ver a página de detalhes do filme

# @cadastroFilme @deletar
# Cenário: usuário logado pode consultar os detalhes dos filmes registrados no catálogo
#     Dado que usuário logado acessa o site
#     Quando acessa a página de detalhes de um filme
#     Então usuário conseguirá ver a página de detalhes do filme

# @cadastroFilme @deletar
# Cenário: Deve ser possível consultar um filme facilmente através do id do filme
#     Dado que usuario não cadastrado acessa o site
#     Quando informa o id valido de um filme
#     Então usuário conseguirá ver a página de detalhes do filme

# Cenário: Consultar um filme utilizando um ID de filme inexistente não deve retornar nenhum filme e as funcionalidades da página devem estar desabilitadas
#     Dado que usuario não cadastrado acessa o site
#     Quando informa o id de um filme "9999999"
#     Então não encontrará nenhum filme
#     E o usuário não conseguirá interagir com as funcionalidades

# #olhar onde se encaixa esse teste
# Cenário: Consultar um filme utilizando um ID de filme invalido não deve retornar nenhum filme e as funcionalidades da página devem estar desabilitadas
#     Dado que usuario não cadastrado acessa o site
#     Quando informa o id de um filme "sdadsa"
#     Então não encontrará nenhum filme
#     E o usuário não conseguirá interagir com as funcionalidades

@cadastroFilme @deletar
Cenário:A página de detalhes do filme deve conter um totalizador das avaliações de audiência e das avaliações de críticos
    Dado que usuario não cadastrado acessa o site
    Quando acessa a página de detalhes de um filme
    Então o usuário conseguirá visualizar um totalizador das avaliações

# // analisar se é possivel aproveitar o step "Então"
Cenário: O totalizador das avaliações de audiência será a média das avalizações dos usuários comuns
    Dado que usuario não cadastrado acessa o site
    Quando acessa a página de detalhes de um filme
    Então o usuário conseguirá visualizar um totalizador com a média das avaliações de audiência

# Cenário: O totalizador das avaliações de notas críticas que será a média das avalizações dos usuários críticos
    # Dado que usuario não cadastrado acessa o site
    # Quando acessa a página de detalhes de um filme
    # Então o usuário conseguirá visualizar um totalizador com a média das avaliações de críticos

# Cenário:A página de detalhes do filme deve conter a opção para avaliar o filme se for acessada por um usuário logado
    # Dado que usuário "logado" acessa o site
    # Quando acessa a página de detalhes de um filme
    # Então será possível criar uma avaliação para o filme 

# Cenário:A página de detalhes do filme deve conter a opção para fazer login se for acessada por um usuário não logado 
    # Dado que usuario não cadastrado acessa o site
    # Quando acessa a página de detalhes de um filme
    # E tentar criar uma avaliação para o filme
    # Então o sistema retornará a opção para realizar o login

# Cenário: A página de detalhes do filme deve conter todas as avaliações registradas para o filme
    # Dado que usuario não cadastrado acessa o site
    # Quando acessa a página de detalhes de um filme
    # Então o usuário conseguirá visualizar todas as avaliações registradas para o filme

# Cenário: A página de detalhes do filme deve conter todas as avaliações registradas para o filme
    # Dado que usuario não cadastrado acessa o site
    # Quando acessa a página de detalhes de um filme
    # Então o usuário conseguirá visualizar todas as avaliações registradas para o filme

# Cenário: As avaliações registradas para o filme devem conter as informações relevantes (data da avaliação (opcionalmente exibir a hora/minuto), nome do usuário que escreveu a avaliação, nota e texto da avaliação)
    # Dado que usuario não cadastrado acessa o site
    # Quando acessa a página de detalhes de um filme
    # Então o usuário conseguirá visualizar todas as informações relevantes das avaliações do filme