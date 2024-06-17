Funcionalidade: Exclusão de conta

Cenário: Exclusão de conta por um administrador autenticado
Dado que o administrador está autenticado
Quando ele exclui uma conta
Então a conta deve ser removida do sistema

Cenário: Exclusão de conta por um não administrador
Dado que um usuário comum está autenticado
Quando ele tenta excluir uma conta
Então ele deve receber uma mensagem de erro de permissão

Cenário: Tentativa de exclusão de conta com sessão expirada
Dado que a sessão do usuário está expirada
Quando ele tenta excluir uma conta
Então ele deve receber uma mensagem de sessão expirada

Cenário: Tentativa de exclusão de uma conta inexistente
Dado que o administrador está autenticado
Quando ele tenta excluir uma conta inexistente
Então ele deve receber uma mensagem de erro informando que a conta não existe


Cenário: Exclusão de conta e verificação da remoção de avaliações associadas
Dado que o administrador está autenticado
E a conta possui avaliações associadas
Quando ele exclui a conta
Então as avaliações associadas devem ser removidas do sistema

Cenário: Exclusão de conta com avaliações associadas
Dado que o administrador está autenticado
E a conta possui avaliações associadas
Quando ele exclui a conta
Então as avaliações associadas devem ser removidas do sistema
