# language: pt
Funcionalidade: Evolução para perfil crítico
    Como um usuário da aplicação 
    Desejo poder me tornar um crítico
    Para ser capaz de compartilhar minha opinião sobre os filmes com um tom mais especializado
    
    Contexto: Evolução para perfil crítico com Usuário Autenticado
        Dado que o usuário está autenticado na aplicação
        
        Cenario: Usuário com perfil padrão solicita se tornar crítico
            Quando o usuário do tipo comum solicita se tornar um crítico
            Entao o sistema atualiza o status do usuário para crítico
            E o sistema exibe uma mensagem de confirmação

        Cenario: Usuário com perfil Administrado solicita se tornar crítico
            Quando o usuário do tipo administrador solicita se tornar um crítico
            Entao o sistema atualiza o status do usuário para crítico
            E o sistema exibe uma mensagem de confirmação

    Contexto: Evolução para perfil crítico com usuario nao Autenticado
        Dado que o usuário nao está autenticado na aplicação

        Cenario: Usuário sem autenticação solicita se tornar crítico
            Quando o usuário solicita se tornar um crítico
            Entao o sistema nao promove o usuario
            E uma mensagem de erro é exibida
        