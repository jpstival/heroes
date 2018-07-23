## Node.js com Postgres API

### Dependencias

* NodeJS: [Node.js v8+](https://nodejs.org/dist/v8.11.3/node-v8.11.3-x64.msi)
* Postgres: [Postgres](https://www.postgresql.org/download/)

### Rodando na maquina localmente

* Instalar dependencias globais do projeto - `npm install -g nodemon`
* Instalar dependencias locais do projeto - `npm install`
* Alterar .env com string de conexão do seu banco de dados - `usuario:senha@host:porta`
* Iniciar projeto - `npm start`

### Visualizar

* Página de documentação da API com Swagger - `localhost:3000/documentation`


### Exercicio da semana

* Ajustar banco de dados como o modelo abaixo:
* Ajustar API para testes RESTFULL(GET,POST,PUT,DELETE)
* Criar relações: `Heroes x Poderes`
```
heroes{
    nome
    nomeHeroe
    editora
    usuarioId
}

poderes{
    nome
    poder    
    heroesId
}

usuarios{
    nome
    senha    
}
```
