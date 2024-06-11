# Rotina de Versionamento

## Rotina Diária

#verificar em qual branch está

git checkout

#se estiver em branch errada
git checkout sua-branch

#clonar a develop para sua branch
git reset --hard develop

#faça seus codigos e seus devidos commits
git add .
git commit -m "sua mensagem"
git push -u origin sua-branch --force

#no final do dia, merge da sua branch com a develop (depois de ter feito seu último commit)
git checkout develop
git reset --hard sua-branch
git push origin develop --force

#branch main só será mergeada ao final do projeto

## Atualização de Commands/Paths/Steps na develop

#fazer checkout na develop
git checkout develop

#copiar path do arquivo (as barras são para direita "/") + nome da sua branch
git checkout sua-branch -- C:/Users/Usuario/Desktop/teste-versionamento/commands.json

#adicionar na fila o path
git add C:/Users/Usuario/Desktop/teste-versionamento/commands.json

#commitar e enviar
git commit -m "commands atualizado"
git push -u origin develop --force

## Pegar apenas atualização de commands

#Checkout na sua branch
git checkout sua-branch

#trazer arquivo de commands da develop para sua branch sem alterar demais arquivos
git checkout develop -- C:/Users/Usuario/Desktop/teste-versionamento/commands.json