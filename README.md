<!DOCTYPE html>
<html lang="pt-br">

<body>
# Rotina de Versionamento

## Rotina Diária

<span style="color:blue">Verificar em qual branch está</span>

git checkout

<span style="color:blue">Se estiver em branch errada</span>

git checkout sua-branch

<span style="color:blue">Clonar a develop para sua branch</span>

git reset --hard develop

<span style="color:blue">Faça seus codigos e seus devidos commits</span>

git add .

git commit -m "sua mensagem"

git push -u origin sua-branch --force

<span style="color:blue">No final do dia, merge da sua branch com a develop (depois de ter feito seu último commit)</span>

git checkout develop

git reset --hard sua-branch

git push origin develop --force

<span style="color:blue">Branch main só será mergeada ao final do projeto</span>


## Atualização de Commands/Paths/Steps na develop

<span style="color:blue">Fazer checkout na develop</span>

git checkout develop

<span style="color:blue">Copiar path do arquivo (as barras são para direita "/") + nome da sua branch</span>

git checkout sua-branch -- C:/Users/Usuario/Desktop/teste-versionamento/commands.json

<span style="color:blue">Adicionar na fila o path</span>

git add C:/Users/Usuario/Desktop/teste-versionamento/commands.json

<span style="color:blue">Commitar e enviar</span>

git commit -m "commands atualizado"

git push -u origin develop --force

## Pegar apenas atualização de commands

<span style="color:blue">Checkout na sua branch</span>

git checkout sua-branch

<span style="color:blue">Trazer arquivo de commands da develop para sua branch sem alterar demais arquivos</span>

git checkout develop -- C:/Users/Usuario/Desktop/teste-versionamento/commands.json

</body>

</html>