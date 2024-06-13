# language: pt

Funcionalidade: Avaliação de filme


#acredito que pode sair, o teste de avaliaçao visivel imediatamente apos a criação já vai cobrir

Contexto: Usuário cadastrado e logado acessa a página de um filme
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
@cadastroFilme @deletar
Cenário: Deve ser possível para um usuário logado criar uma review com sucesso ao informar uma nota e um comentário sobre o filme    
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme deve ser criada com sucesso

# Cenário: Deve ser possível para um usuário logado criar uma review com sucesso ao informar uma nota mas sem informar um comentário sobre o filme
#     E informa uma nota
#     E envia a avaliação do filme
#     Então a avaliação do filme deve ser criada com sucesso

# Cenário: Não deve ser possível para um usuário logado criar uma review sem informar uma nota para o filme
#     E informa um comentario para o filme
#     E envia a avaliação do filme
#     Então o sistema deverá retornar uma mensagem de alerta informando que é necessário informar uma nota

# Cenário: Deve ser possível localizar uma nova avaliação imediatamente depois da mesma ser criada
#     E informa uma nota
#     E informa um comentario para o filme
#     E envia a avaliação do filme
#     Então a avaliação do filme deverá ser criada com sucesso
#     E a avaliação do filme deverá estar visível
#     E a alteração do totalizador de nota deve ser observada

# Cenário: deve ser possível atualizar a avaliação de um filme
#     E cria uma review válida para um filme que já tenha avaliado
#     Então a review será atualizad
#     E não é possível criar uma segunda review

# Esquema do cenário: deve ser possível criar uma review com comentário de até 500 caracteres
#     E informa uma nota
#     E informa um comentario para o filme <"comentário">
#     E envia a avaliação do filme
#     Então a avaliação do filme deverá ser criada com sucesso
    

# cenário de interferencia de nota