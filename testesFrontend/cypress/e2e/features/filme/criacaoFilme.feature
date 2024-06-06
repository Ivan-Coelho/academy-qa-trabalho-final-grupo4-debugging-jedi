# language: pt
Funcionalidade: Criação de filme
    Como um administrador da aplicação
    Desejo poder adicionar novos filmes ao catálogo
    Para que os usuários possam consultar informações e escrever avaliações destes filmes

    Contexto: Cadastro de filme usuario adminstrador
        Dado que o usuário está autenticado como administrador

        Esquema do Cenario: Usuário administrador cadastra um filme com dados válidos
            Quando o usuário cadastrar um novo filme com dados válidos
            Entao o filme é cadastrado com sucesso
            E uma mensagem de sucesso "Filme cadastrado com sucesso" é exibida
        Exemplo:

        Esquema do Cenario: Usuário administrador tenta cadastrar um filme com dados incompletos
            Quando o usuário cadastrar um novo filme com dados incompletos
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida
        Exemplo:    

        Esquema do Cenario: Usuário administrador tenta cadastrar um filme com quantidade de caracteres do titulo invalidos
            Quando o usuário cadastrar um novo filme com titulo invalido
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida
        Exemplo:

        Esquema do Cenario: Usuário administrador tenta cadastrar um filme com quantidade de caracteres do gênero invalidos
            Quando o usuário cadastrar um novo filme com genero invalido
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida
        Exemplo:

        Esquema do Cenario: Usuário administrador tenta cadastrar um filme com quantidade de caracteres da descrição invalidos
            Quando o usuário cadastrar um novo filme com descrição invalida
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida
        Exemplo:

        Esquema do Cenario: Usuário administrador tenta cadastrar um filme com data de lançamento fora do intervalo perimitido
            Quando o usuário cadastrar um novo filme com data de lançamento invalida
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida
        Exemplo:

        Esquema do Cenario: Usuário administrador tenta cadastrar um filme com duração fora do intervalo perimitido
            Quando o usuário cadastrar um novo filme com duração invalida
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida
        Exemplo:

    Contexto: Cadastrar o mesmo filme com novas informações
            Dado que o usuário está autenticado como administrador
        
        Cenario: Cadastrar o mesmo filme com novas informações
            Quando o usuário cadastra um filme com título "Avatar" e ano de lançamento "2009"
            E o usuário cadastra um filme com título "Avatar" e ano de lançamento "2022"
            Entao o sistema cadastra o filme com as novas informações
            E o sistema mantém o registro anterior do filme

        Cenario: Cadastrar o mesmo filme sem novas informações
            Quando o usuário cadastra um filme com título "Avatar" e ano de lançamento "2009"
            E o usuário tenta cadastrar novamente o mesmo filme com título "Avatar" e ano de lançamento "2009"
            Entao o sistema cadastra o filme sem criar um novo registro
            E o sistema mantém o registro existente do filme

    Contexto: Cadastro de filme sem permissoes

        Cenario: Usuário não administrador tenta cadastrar um filme
            Dado que o usuário está autenticado como não administrador
            Quando o usuário cadastrar um novo filme com dados válidos
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida

        Cenario: Usuário não autenticado tenta cadastrar um filme
            Dado que o usuário não está autenticado
            Quando o usuário cadastrar um novo filme com dados válidos
            Entao o filme não é cadastrado
            E uma mensagem de erro é exibida