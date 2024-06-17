Funcionalidade: Consulta de Usuários

Cenário: Consulta de todos os usuários por um administrador autenticado
Dado que o administrador está autenticado
Quando ele consulta a lista de usuários
Então ele deve ver todos os usuários

Cenário: Consulta de todos os usuários por um não administrador
Dado que um usuário comum está autenticado
Quando ele tenta consultar a lista de usuários
Então ele deve receber uma mensagem de erro de permissão

Cenário: Tentativa de acesso à consulta de usuários pela UI
Dado que o usuário está na interface do usuário
Quando ele tenta acessar a consulta de usuários
Então ele deve ver a lista de usuários se estiver autenticado como administrador
E ele não deve ver a lista se estiver autenticado como usuário comum

Cenário: Consulta de usuários e verificação das informações exibidas
Dado que o administrador está autenticado
Quando ele consulta a lista de usuários
Então ele deve ver as seguintes informações de cada usuário: id, nome, email

Cenário: Consulta de um usuário específico por id
Dado que o administrador está autenticado
Quando ele consulta um usuário específico pelo id
Então ele deve ver as informações detalhadas do usuário correspondente ao id
