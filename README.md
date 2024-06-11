# Rotina de Versionamento

## Rotina Diária

Verificar em qual branch está

```bash
git checkout
```

Se estiver em branch errada

```bash
git checkout sua-branch
```

Clonar a develop para sua branch

```bash
git reset --hard develop
```

Faça seus codigos e seus devidos commits

```bash
git add .
git commit -m "sua mensagem"
git push -u origin sua-branch --force
```

No final do dia, merge da sua branch com a develop (depois de ter feito seu último commit)

```bash
git checkout develop
git merge sua-branch
git push origin develop --force
```

Branch main só será mergeada ao final do projeto


## Atualização de Commands/Paths/Steps na develop

Fazer checkout na develop

```bash
git checkout develop
```

Copiar path do arquivo (as barras são para direita "/") + nome da sua branch

```bash
git checkout sua-branch -- C:/Users/Usuario/Desktop/teste-versionamento/commands.json
```

Adicionar na fila o path

```bash
git add C:/Users/Usuario/Desktop/teste-versionamento/commands.json
```

Commitar e enviar

```bash
git commit -m "commands atualizado"
git push -u origin develop --force
```

## Pegar apenas atualização de commands

Checkout na sua branch

```bash
git checkout sua-branch
```

Trazer arquivo de commands da develop para sua branch sem alterar demais arquivos

```bash
git checkout develop -- C:/Users/Usuario/Desktop/teste-versionamento/commands.json
```
