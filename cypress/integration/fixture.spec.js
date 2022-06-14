/// <reference types="cypress" />

describe('Fixtures tests',() => {
    it('Get data form fixture file', function () {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.fixture('userData').as('Usuario').then(() => {
            cy.get('#formNome').type(this.Usuario.nome)
            cy.get('#formSobrenome').type(this.Usuario.sobrenome)   
            cy.get(`[name=formSexo][value=${this.Usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.Usuario.comida}]`).click()
            cy.get('#formEscolaridade').select(this.Usuario.escolaridade)
            cy.get('#formEsportes').select(this.Usuario.esportes)

            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })       
        
    })
})