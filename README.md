# Boas práticas para automatização em Cypress

## Tecnologias

- [NodeJS](https://nodejs.org/)
- [Cypress](https://www.cypress.io/)

## Comandos

**Acesso ao sistema**

Ao baixar o arquivo a pasta "cypress.env.json.example" deverá ser alterada para "cypress.env.json", e os campos E-mail e senha deverá ser preenchido.


**Instalação das dependências**

Foi instalado a dependência dayjs (npm install dayjs) para realizar testes com data

Comando: failOnStatusCode: false  //validar testes com status de erro

```
npm i
``` 

**Execução dos testes**

```
npx cypress run
``` 
