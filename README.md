# Boas práticas para automatização em Cypress

## Tecnologias

- [NodeJS](https://nodejs.org/)
- [Cypress](https://www.cypress.io/)

## Comandos

**Acesso ao sistema**

Ao baixar o arquivo a pasta "cypress.env.json.example" deverá ser alterada para "cypress.env.json", e os campos E-mail e senha deverá ser preenchido.


**Instalação das dependências**

Foi instalado a dependencia dayjs (npm install dayjs) para realizar testes com data

dayjs('2018-08-08') // parse

dayjs().format('{YYYY} MM-DDTHH:mm:ss SSS [Z] A') // display

dayjs().set('month', 3).month() // get & set

dayjs().add(1, 'year') // manipulate

dayjs().isBefore(dayjs()) // query


```
npm i
``` 

**Execução dos testes**

```
npx cypress run
``` 
