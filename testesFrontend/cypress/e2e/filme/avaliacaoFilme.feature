# language: pt

Funcionalidade: Avaliação de filme    

@cadastroFilme @deletar
Cenário: Deve ser possível para um usuário logado criar uma review com sucesso ao informar uma nota e um comentário sobre o filme    
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso

@cadastroFilmeReview @deletar
Cenário: Usuário criar review em um filme já com uma review deve alterar a nota de audiência imediatamente   
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada    
    E a nota de audiência será alterada para a média

@cadastroFilme @deletar
Cenário: Deve ser possível para um usuário logado criar uma review com sucesso ao informar uma nota mas sem informar um comentário sobre o filme
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso sem o comentários

@cadastroFilme @deletar
Cenário: Não deve ser possível para um usuário logado criar uma review sem informar uma nota para o filme
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então o sistema deverá retornar uma mensagem de alerta informando que é necessário informar uma nota

#seria interessante validar a data
@cadastroFilme @deletar
Cenário: Deve ser possível localizar uma nova avaliação imediatamente depois da mesma ser criada
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso   
    E a alteração do totalizador de nota deverá ser observada

@cadastroFilme @deletar
Cenário: deve ser possível atualizar a avaliação de um filme
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E cria uma review válida para um filme que já tenha avaliado
    Então a review será atualizada
    E não será possível criar uma segunda review para o mesmo filme

@cadastroFilme @deletar
Cenário: deve ser possível criar uma review com comentário de até 500 caracteres
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario grande para o filme 
    E envia a avaliação do filme
    Então a review do filme será criada com sucesso

@cadastroFilme @deletar
Cenário: não deve ser possível criar uma review com comentário com mais de 500 caracteres
    Dado que usuário logado acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario gigante para o filme 
    E envia a avaliação do filme
    Então a review do filme não será criada com sucesso

@cadastroFilme @deletar
Cenário: Deve ser possível para um usuário crítico criar uma review com sucesso   
    Dado que usuário critico acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme será criada com sucesso impactando a nota critica

@cadastroFilme @deletar
Cenário: Deve ser possível para um usuário administrador criar uma review com sucesso  
    Dado que usuário administrador acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme deverá ser criada com sucesso

@cadastroFilme @deletar
Cenário: Uma avaliação de usuário administrador não deve impactar os totalizadores  
    Dado que usuário administrador acessa o site
    Quando acessa a página de detalhes de um filme
    E informa uma nota
    E informa um comentario para o filme
    E envia a avaliação do filme
    Então a avaliação do filme deverá ser criada com sucesso
    E não deve impactar o totalizador das avaliações