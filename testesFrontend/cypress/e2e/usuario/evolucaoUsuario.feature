# language: pt
Funcionalidade: Evolução para perfil crítico
    Como um usuário da aplicação 
    Desejo poder me tornar um crítico
    Para ser capaz de compartilhar minha opinião sobre os filmes com um tom mais especializado
    
    Contexto: Evolução para perfil crítico com Usuário Autenticado
        Dado que o usuário está autenticado na aplicação
        
        Cenario: Usuário com perfil comum solicita se tornar crítico
            Quando o usuário do tipo comum solicita se tornar um crítico
            Entao o sistema atualiza o status do usuário para crítico
            E o sistema exibe uma mensagem de confirmação

        Cenario: Usuário com perfil Administrador solicita se tornar crítico
            Quando o usuário do tipo administrador solicita se tornar um crítico
            Entao o sistema atualiza o status do usuário para crítico
            E o sistema exibe uma mensagem de confirmação

    Contexto: Evolução para perfil crítico de usuario não logado/autorizado
        Dado que o usuário nao está autenticado na aplicação

Funcionalidade: Evolução para perfil administrador

Cenário: Evolução de um usuário autenticado para perfil administrador
Dado que um usuário comum está autenticado
Quando ele solicita a evolução para perfil administrador
Então o perfil dele deve ser atualizado para administrador

Cenário: Evolução de um usuário não autenticado para perfil administrador
Dado que o usuário não está autenticado
Quando ele solicita a evolução para perfil administrador
Então ele deve receber uma mensagem de erro de autenticação

Cenário: Tentativa de evolução para administrador por um usuário com sessão expirada
Dado que a sessão do usuário está expirada
Quando ele solicita a evolução para perfil administrador
Então ele deve receber uma mensagem de sessão expirada

Cenário: Evolução de um usuário com avaliações anteriores para administrador e verificação das avaliações
Dado que o usuário autenticado tem avaliações anteriores
Quando o perfil dele é evoluído para administrador
Então as avaliações anteriores dele devem permanecer inalteradas

Cenário: Avaliação feita por um administrador não impacta métricas de críticas
Dado que o usuário é um administrador
Quando ele faz uma avaliação
Então a avaliação dele não deve impactar as métricas de críticas

Cenário: Avaliação feita por um administrador não impacta métricas de usuários comuns
Dado que o usuário é um administrador
Quando ele faz uma avaliação
Então a avaliação dele não deve impactar as métricas de usuários comuns

Cenário: Avaliações anteriores de um usuário comum permanecem inalteradas após evolução para administrador
Dado que o usuário comum tem avaliações anteriores
Quando o perfil dele é evoluído para administrador
Então as avaliações anteriores dele devem permanecer inalteradas
        Cenario: Não deve ser possivel que um usuário sem autenticação se torne crítico
            Quando o usuário solicita se tornar um crítico
            Entao o sistema nao promove o usuario
            E uma mensagem de erro é exibida
        
