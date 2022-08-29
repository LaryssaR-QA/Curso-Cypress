/// <reference types="cypress" />

describe('Cypress basic', () => {

    it.only('Should visit a page and assert title', () => {

        //const title = cy.title()
        //console.log(title)

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.title().should('be.equal', 'Campo de Treinamento')    
        
        cy.title()
        .should('be.equal', 'Campo de Treinamento')
        .and('contain', 'Campo de Treinamento')

        cy.title().then(title => {
            console.log(title)
        })

        cy.title().should(title => {
            console.log(title)
        })

     }) //teste git

     

    it('should find and interact with an elemento', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#buttonSimple').click()// opção clicar no botão
        cy.get('#buttonSimple').should('have.value', 'Obrigado!')//assertiva 

    })//Função de clicar em um botão
    
})// acessar a pagina web