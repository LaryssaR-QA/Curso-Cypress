/// <reference types="cypress" />

describe('Esperas...', ()=> {
    
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE all"

    beforeEach(() => {
        cy.reload()
        
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE EACH"


    it('Deve aguardar elemento estar disponovivel', () =>{

        cy.get('#novoCampo').should('not.exist')

        cy.get('#buttonDelay').click()

        cy.get('#novoCampo').should('not.exist')

        cy.get('#novoCampo').should('exist')        

        cy.get('#novoCampo').type('Funcionou')
        
    })//campo de espera!

    
    it.only('Deve fazer retrys', () =>{

        cy.get('#buttonDelay').click()

        cy.get('#novoCampo')
       // .should('not.exist')   
        .should('exist')
        .type('funciona')
    
    })//campo de espera com TYPE



})//fim do describe


