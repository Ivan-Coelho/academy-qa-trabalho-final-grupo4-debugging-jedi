# language: pt

Funcionalidade: Avaliação de filme

Contexto: Usuário cadastrado e logado acessa a página de um filme
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme

@cadastroFilme @deletar
Esquema do Cenário: Deve ser possível para um usuário logado criar uma review com sucesso ao informar uma nota e um comentário sobre o filme    
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso

@cadastroFilmeReview @deletar
Cenário: Usuário criar review em um filme já com uma review deve alterar a nota de audiência imediatamente   
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada
    E a avaliação do filme será criada

@cadastroFilme @deletar
Cenário: Deve ser possível para um usuário logado criar uma review com sucesso ao informar uma nota mas sem informar um comentário sobre o filme
    E informa uma nota
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso sem o comentários

@cadastroFilme @deletar
Cenário: Não deve ser possível para um usuário logado criar uma review sem informar uma nota para o filme
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então o sistema deverá retornar uma mensagem de alerta informando que é necessário informar uma nota

#seria interessante validar a data
@cadastroFilme @deletar
Cenário: Deve ser possível localizar uma nova avaliação imediatamente depois da mesma ser criada
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso   
    E a alteração do totalizador de nota deverá ser observada

@cadastroFilme @deletar
Cenário: deve ser possível atualizar a avaliação de um filme
    E cria uma review válida para um filme que já tenha avaliado
    Então a review será atualizada
    E não será possível criar uma segunda review para o mesmo filme

@cadastroFilme @deletar
Cenário: deve ser possível criar uma review com comentário de até 500 caracteres
    E informa uma nota
    E informa um comentario grande para o filme 
    E envia a avaliação do filme
    Então a review do filme será criada com sucesso

@cadastroFilme @deletar
Cenário: não deve ser possível criar uma review com comentário com mais de 500 caracteres
    E informa uma nota
    E informa um comentario gigante para o filme 
    E envia a avaliação do filme
    Então a review do filme não será criada com sucesso
    

# cenário de interferencia de nota