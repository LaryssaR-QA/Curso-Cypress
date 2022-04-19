/// <reference types="cypress" />

describe('Cypress basic', () => {

    it('Should visit a page and assert title', () => {

        //const title = cy.title()
        //console.log(title)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().should('be.equal', 'Campo de Treinamento')    
        
        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo de Treinamento')

        //TODO imprimir o log no console
        //TODO escrever o log em um campo de texto

    })

    it('should find and interact with an elemento', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple').click()// opção clicar no botão
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')//acertiva

    })//Função de clicar em um botão
    
})// acessar a pagina web