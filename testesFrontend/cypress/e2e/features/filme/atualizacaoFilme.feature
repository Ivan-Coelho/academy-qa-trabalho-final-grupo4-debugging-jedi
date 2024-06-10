#language: pt

Funcionalidade: Atualizar filme

Cenário: Deve ser possível atualizar um filme com sucesso
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando selecionar a opção de atualizar um filme 
E fornecer todas as informações necessárias
Então o sistema deverá permitir que o administrador atualize as informações do filme

Cenário: Deve ser possível atualizar parcialmente as informações de um filme
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando selecionar a opção de atualizar um filme 
E fornecer apenas algumas novas informações
Então o sistema deve permitir que o administrador atualize parcialmente as informações do filme, mantendo as informações não fornecidas inalteradas. 

Cenário: Não deve ser possível um usuário não logado realizar a atualização de um filme
Dado que um usuário não autenticado tenta atualizar um filme
Quando acessar a funcionalidade de atualização de filme
Então o sistema deve impedir o acesso e exibir uma mensagem de erro.

Cenário: Não deve ser possível um usuário comum realizar a atualização de um filme
Dado que um usuário comum tenta atualizar um filme
Quando acessar a funcionalidade de atualização de filme
Então o sistema deve impedir o acesso e exibir uma mensagem de erro.

Cenário: Não deve ser possível um usuário crítico realizar a atualização de um filme
Dado que um usuário crítico tenta atualizar um filme
Quando acessar a funcionalidade de atualização de filme
Então o sistema deve impedir o acesso e exibir uma mensagem de erro.

Cenário: Não deve ser possível atualizar um filme com ano no futuro
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme fornecendo um ano de lançamento no futuro
Então o sistema deve rejeitar a atualização e exibir uma mensagem de erro informando que as informações fornecidas são inválidas.

Cenário: Não deve ser possível atualizar um filme não cadastrado
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme cujo Id não está presente no catálogo
Então o sistema deve informar que o filme não existe e impedir a atualização.

Cenário: Deve ser possível atualizar um filme com título de 1 caracter
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme inserindo apenas 1 caracter no título
Então o sistema deve informar que o filme foi atualizado com sucesso.

Cenário: Deve ser possível atualizar um filme com título de 100 caracteres
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme inserindo 100 caracteres no título
Então o sistema deve informar que o filme foi atualizado com sucesso.

Cenário: Não deve ser possível atualizar um filme com título de mais de 100 caracteres
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme inserindo mais de 100 caracteres no título
Então o sistema deve informar uma mensagem de alerta informando que o limite de caracteres é 100.

Cenário: Deve ser possível atualizar um filme com gênero de 1 caracter
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme inserindo apenas 1 caracter no gênero
Então o sistema deve informar que o filme foi atualizado com sucesso.

Cenário: Deve ser possível atualizar um filme com gênero de 100 caracteres
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme inserindo 100 caracteres no gênero
Então o sistema deve informar que o filme foi atualizado com sucesso.

Cenário: Não deve ser possível atualizar um filme com gênero de mais de 100 caracteres
Dado que um usuário administrador autenticado acessou o Backend do sistema
Quando atualizar um filme inserindo 101 caracteres no gênero
Então o sistema deve informar uma mensagem de alerta informando que o limite de caracteres é 100.

# Cenário: Deve ser possível atualizar um filme com descrição de 1 caracter
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com descrição de 1 caracter
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Deve ser possível atualizar um filme com descrição de 500 caracteres
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com descrição de 500 caracteres
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Não deve ser possível atualizar um filme com descrição de mais de 500 caracteres
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com descrição de mais de 500 caracteres
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Deve ser possível atualizar um filme com ano de lançamento 1895
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com ano de lançamento 1895
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Deve ser possível atualizar um filme com ano de lançamento 2024
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com ano de lançamento 2024
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Não deve ser possível atualizar um filme com ano de lançamento 1894
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com ano de lançamento 1894
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Não deve ser possível atualizar um filme com ano de lançamento no futuro
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com ano de lançamento no futuro
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Deve ser possível atualizar um filme de 1 minuto de duração
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com 1 minuto de duração
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Deve ser possível atualizar um filme de 720 horas de duração
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com 720 horas de duração
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Não deve ser possível atualizar um filme com menos de 1 minuto de duração
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com menos de 1 minuto de duração
# Então o sistema deve informar que o filme foi atualizado com sucesso.

# Cenário: Não deve ser possível atualizar um filme com mais de 720 horas de duração
# Dado que um usuário administrador autenticado acessou o Backend do sistema
# Quando atualizar um filme com mais de 720 horas de duração
# Então o sistema deve informar que o filme foi atualizado com sucesso.