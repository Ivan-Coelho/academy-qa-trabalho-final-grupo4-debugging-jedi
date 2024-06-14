# language: pt
Funcionalidade: Consulta de avaliações do usuário
    Como um usuário da aplicação 
    Desejo poder consultar as avaliações feitas por mim
    Para pode ter histórico de minhas avaliações
    
    Contexto: Consulta de Avaliações do Usuário Autenticado
        Dado que o usuário está logado e autenticado na aplicação
           
        Cenario: Consulta de Avaliações por Usuário 
            Quando o usuário acessa a seção de consulta de avaliações
            Entao todas as avaliações feitas pelo usuário são exibidas
            E as avaliações pertencem apenas ao usuário autenticado

        Cenario: Verificação de Avaliações Únicas por Filme
            Quando o usuário acessa a seção de consulta de avaliações
            Entao todas as avaliações feitas pelo usuário são exibidas
            E não existem avaliações duplicadas para o mesmo filme

        Cenario: Visualização de Detalhes das Avaliações
            Quando o usuário acessa a seção de consulta de avaliações
            Entao todas as avaliações feitas pelo usuário são exibidas
            E os detalhes do filme avaliado são exibidos
           
        
        Cenario: A consulta de avaliações do filme usuário deve visualizar avaliaçoes marcadas conforme seu perfil usado na avaliação
            Quando o usuário acessa a seção de consulta de avaliações
            E existem avaliaçoes anteriores para o mesmo filme feita pelos perfis crítico e administrador
            Entao todas as avaliações feitas pelo usuário são exibidas
            E as avaliações devem estar marcadas conforme o perfil

        Cenario: Consulta de Avaliações por Usuário sem avaliação registrada
            Quando o usuário acessa a seção de consulta de avaliações
            E que o usuário não possui avaliações registradas
            Entao e exibida uma lista de avaliçoes vazia
                 
    # Contexto: Consulta de Avaliações do Usuário não Autenticado
        Dado que o usuário não está autenticado na aplicação
        
        Cenario: Nao deve ser possivel que um usuário não autenticado acesse as avaliações
            Quando o usuário acessa a seção de consulta de avaliações
            Entao o acesso é negado
            E uma mensagem de erro é exibida