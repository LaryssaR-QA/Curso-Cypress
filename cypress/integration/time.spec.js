/// <reference types="cypress" />

describe('Work with alerts',() => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE all"

    it('Going back to the past', () => {

        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '26/06/2022')//current time

        //cy.clock()
        //cy.get('#buttonNow').click()
        //cy.get('#resultado > span').should('contain', '31/12/1969')//returning the date

        const dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')//changing the date
    })

    it.only('Goes to the future', () => {
        
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '16562')

        cy.get('#resultado > span').invoke('text').should('gt', '1656291491279')  //greater assertive value

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)  

        cy.wait(1000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 1000)

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)

    })//future tense 

})