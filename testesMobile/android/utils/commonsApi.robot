*** Settings ***
Resource    ../base.robot
Library    OperatingSystem
Library    String

*** Keywords ***

Iniciar API
    ${headers}=    Create Dictionary    accept=application/json    Content-Type=application/json
    Create Session    alias=raromdb    url=https://raromdb-3c39614e42d4.herokuapp.com/    headers=${headers}

Iniciar API COM TOKEN
    [Arguments]    ${token}    
    ${headers}    Create Dictionary    accept=application/json    Content-Type=application/json    Authorization=Bearer ${token}      
    Create Session    alias=raromdb    url=https://raromdb-3c39614e42d4.herokuapp.com    headers=${headers}

cadastrar usuario na API         
    ${nome_fake}=    FakerLibrary.Name
    ${email_fake}=    FakerLibrary.Email
    ${BODY_CADASTRO}    Create Dictionary    name=${nome_fake}    email=${email_fake}    password=123456
    Iniciar API
    ${RESPOSTA}    POST On Session    alias=raromdb    url=/api/users     json=${BODY_CADASTRO}
    Set Test Variable    ${RESPONSE}    ${RESPOSTA.json()}    
    ${EMAIL_API}    Set Variable    ${RESPONSE['email']}
    Set Global Variable    ${EMAIL_API}
    Set Global Variable    ${NOME_API}       ${RESPONSE['name']}
    Set Global Variable    ${ID_USER-API}    ${RESPONSE['id']}

Login usuario pela API
    [Arguments]    ${email}
    ${BODY_LOGIN}    Create Dictionary    email=${email}    password=123456        
    Iniciar API
    ${RESPOSTA}    POST On Session    alias=raromdb    url=/api/auth/login    json=${BODY_LOGIN}
    Set Test Variable    ${RESPONSE}    ${RESPOSTA.json()}
    Set Global Variable    ${TOKEN}    ${RESPONSE['accessToken']}
    

Evoluir para administrador
    [Arguments]    ${token}
    Iniciar API COM TOKEN    ${token}
    PATCH On Session     alias=raromdb   url=/api/users/admin

Criar um filme
     [Arguments]    ${token}
    ${releaseYear}    Convert To Number    1977
    ${durationInMinutes}    Convert To Number    120        
    ${BODY_FILME}    Create Dictionary    title=Star Wars: Uma nova esperança    genre=Épico, Aventura, Ficção científica    description=A princesa Leia é mantida refém pelas forças imperiais comandadas por Darth Vader        
    ...   durationInMinutes=${durationInMinutes}     releaseYear=${releaseYear}    
    Iniciar API COM TOKEN    ${token}
    ${RESPOSTA}    POST On Session    alias=raromdb    url=/api/movies    json=${BODY_FILME}
    Set Test Variable    ${RESPONSE}    ${RESPOSTA.json()}
    Set Global Variable    ${ID_FILME}    ${RESPONSE['id']}

Deletar um filme
    [Arguments]    ${token}    ${idFilme}
    Iniciar API COM TOKEN    ${token}
    DELETE On Session   alias=raromdb    url=/api/movies/${idFilme}

Deletar um usuario
    [Arguments]    ${token}    ${idUsuario}
    Iniciar API COM TOKEN    ${token}
    DELETE On Session   alias=raromdb    url=/api/users/${idUsuario}

Evoluir para Critico
    [Arguments]    ${token}
    Iniciar API COM TOKEN    ${token}
    PATCH On Session     alias=raromdb   url=/api/users/apply
    
Cria uma review
    [Arguments]    ${token}
    ${score}    Convert To Number    3
    Iniciar API COM TOKEN    ${token}
    ${BODY_FILME}    Create Dictionary    movieId=${ID_FILME}    score=${score}    reviewText= Que filme maneiro zuumm zuummm

