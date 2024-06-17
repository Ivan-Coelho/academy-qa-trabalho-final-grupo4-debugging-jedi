# Validação do sistema RaroMDB
Esse projeto é a execução trabalho final do curso de Quality Assurance oferecido pela [Raro Academy](https://www.raroacademy.com.br/), e tem como objetivo validar a qualidade do sistema RaroMDB, utilizando de BDD, testes automatizados de API, Front-End e Mobile, utilizando tecnologias como Scrum, Cypress, Gherkin, Cucumber, Robot, Appium, Android Studio e suas devidas bibliotecas.

### Membros do grupo Debugging Jedi: The Bugs Strike Back
- Gabriel Vilela
- Ivan Coelho
- Maiara Magalhães
- Samuel Souza
- Tatiane Cavichiole

### Sistemas Validados
- [SWAGGER](https://raromdb-3c39614e42d4.herokuapp.com/swagger)
- [Site](https://raromdb-frontend-c7d7dc3305a0.herokuapp.com/)
- [APP](https://drive.google.com/file/d/1XXnwSrbgJgNgOyXOHfv7CKWAtf6A3MmD/view) - Este precisa ser baixado e instalado corretamente para execução dos testes de mobile.

### Nossa organização
- Divisão e acompanhamento do andamento do trabalho - [Trello](https://trello.com/b/jd6Sid02/kanban-grupo-4)
- Report de Bugs - [Trello](https://trello.com/b/7gqMDifK/report-bugs)

### Apresentação Final
- [Apresentação]()

## Como Instalar Dependências e Rodar os Testes
O trabalho foi dividido em 3 pastas, cada uma delas possui uma dependência específica.

### API
Ao acessar o repositório, precisará abrir o terminal no seu editor de código, e entrar na pasta do testes de api utilizando o diretório: 

```bash
cd ~/academy-qa-trabalho-final-grupo4-debugging-jedi/testesApi
```

Instalar as dependências

```bash
npm install
```

Rodar os testes

```bash
npx cypress open
```

### Front-End
Ao acessar o repositório, precisará abrir o terminal no seu editor de código, e entrar na pasta do testes de frontend utilizando o diretório: 

```bash
cd ~/academy-qa-trabalho-final-grupo4-debugging-jedi/testesFrontend

```
Instalar as dependências

```bash
npm install
```

Rodar os testes

```bash
npx cypress open
```

### Front-End
Ao acessar o repositório, precisará abrir o terminal no seu editor de código, e entrar na pasta do testes de mobile utilizando o diretório: 

```bash
cd ~/academy-qa-trabalho-final-grupo4-debugging-jedi/testesMobile

```
Instalar as dependências

```bash
pip install robotframework-requests
pip install setuptools
pip install robotframework-faker
```

# Rotina de Versionamento

Verificar em qual branch está

```bash
git checkout
```

Se estiver em branch errada

```bash
git checkout sua-branch
```

Atualizar seu repositório remoto com o com o git

```bash
git pull
```

Faça seus codigos e seus devidos commits

```bash
git add .
git commit -m "sua mensagem"
git push -u origin sua-branch --force
```

Atualize novamente seu repositório remoto com o com o git, essa é uma boa prática, alguém pode ter trabalhado na sua branch

```bash
git pull
```

Trate os Merge Conflits, se houver, e sincronize suas mudanças

### Agora é hora de dar merge no seu desenvolvimento com a branch main

Vá para a Main Branch e atualize ela, alguém pode ter trabalhado nela também

```bash
git checkout main
git pull
```

A boa prática, é sempre primeiro dar merge com da main na sua branch, e depois levar essas mudanças para a main

Volte para a sua branch

```bash
git checkout sua-branch
```

Dê merge com a main

```bash
git merge main
```

Trate os Merge Conflits, se houver, e sincronize suas mudanças

Agora podemos voltar para a main e atualizar ela, alguém pode ter trabalhado nela enquanto estava fazendo merge

```bash
git checkout main
git pull
```

Merge na sua-branch

```bash
git merge sua-branch
```

Trate os Merge Conflits, se houver, e sincronize suas mudanças

Pronto, suas mudanças estão todas salvas, atualizadas, "mergeadas" e comentadas!!!