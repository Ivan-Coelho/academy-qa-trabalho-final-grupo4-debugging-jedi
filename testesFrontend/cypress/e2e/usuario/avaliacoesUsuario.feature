# language: pt
Funcionalidade: Consulta de avaliações do usuário
    Como um usuário da aplicação 
    Desejo poder consultar as avaliações feitas por mim
    Para pode ter histórico de minhas avaliações
    
    Contexto: Consulta de Avaliações do Usuário 
        
        @filmeReviewComum @deletar 
        Cenario: Consulta de Avaliações por Usuário Comum
            Dado que o usuário comum está logado e autenticado na aplicação
            Quando o usuário acessa a seção de consulta de avaliações 
            E o usuário comum tem avaliações de filme registradas
            Entao todas as avaliações feitas pelo usuário são exibidas
            E as avaliações pertencem apenas ao usuário autenticado

        @filmeReviewComum @deletar
        Cenario: Verificação de Avaliações Únicas por Filme como Usuário Comum
            Dado que o usuário comum está logado e autenticado na aplicação
            Quando o usuário acessa a seção de consulta de avaliações 
            E o usuário comum tem avaliações de filme registradas
            Entao todas as avaliações feitas pelo usuário são exibidas
            E não existem avaliações duplicadas para o mesmo filme

        @filmeReviewComum @deletar
        Cenario: Visualização de Detalhes das Avaliações como Usuário Comum
            Dado que o usuário comum está logado e autenticado na aplicação
            Quando o usuário acessa a seção de consulta de avaliações 
            E o usuário comum tem avaliações de filme registradas
            Entao todas as avaliações feitas pelo usuário são exibidas
            E os detalhes do filme avaliado são exibidos
           
        @filmeReviewComum @deletar
        Cenario: Consulta de Avaliações por Usuário sem avaliação registrada como Usuário Comum
            Dado que o usuário comum está logado e autenticado na aplicação
            Quando o usuário acessa a seção de consulta de avaliações
            E que o usuário não possui avaliações registradas
            Entao e exibida uma lista de avaliçoes vazia
        
  