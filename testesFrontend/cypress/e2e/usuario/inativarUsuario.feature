Funcionalidade: Inativação de Conta

    Cenário: Inativação de conta por um usuário autenticado
        Dado que o usuário está autenticado
        Quando ele inativa sua conta
        Então a conta dele deve ser marcada como inativa no sistema

    Cenário: Inativação de conta por um usuário não autenticado
        Dado que o usuário não está autenticado
        Quando ele tenta inativar sua conta
        Então ele deve receber uma mensagem de erro de autenticação

    Cenário: Tentativa de inativação de conta de outro usuário por um não administrador
        Dado que um usuário comum está autenticado
        Quando ele tenta inativar a conta de outro usuário
        Então ele deve receber uma mensagem de erro de permissão

    Cenário: Verificação de avaliações após inativação de conta
        Dado que a conta do usuário está inativa
        Quando ele verifica suas avaliações
        Então as avaliações dele devem permanecer inalteradas

    Cenário: Inativação de conta com avaliações associadas
        Dado que o usuário está autenticado
        E a conta dele possui avaliações associadas
        Quando ele inativa sua conta
        Então a conta dele deve ser marcada como inativa e as avaliações devem permanecer no sistema

    Cenário: Disponibilidade do e-mail após inativação de conta
        Dado que a conta do usuário está inativa
        Quando ele verifica a disponibilidade do seu e-mail
        Então o e-mail dele deve ser disponibilizado para uso em novas contas
