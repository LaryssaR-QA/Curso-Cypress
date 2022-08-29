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

    
    it('Deve fazer retrys', () =>{

        cy.get('#buttonDelay').click()

        cy.get('#novoCampo')
       // .should('not.exist')   
        .should('exist')
        .type('funciona')
    
    })//campo de espera com TYPE

    it('Uso do find', () => {

        cy.get('#buttonList').click()
        cy.get('#lista li')
        .find('span')
        .should('contain', 'Item 1') //validação item 2

        cy.get('#lista li span')
        .should('contain', 'Item 2') //validação item 2
      
    })//Campo Listar com o comando FIND

    it.only('Uso do Timeout', () => {

        /*cy.wait(5000) - tempo fixo de espera

        cy.get('#buttonDelay').click()
        cy.get('#novoCampo',{ timeout:7000 }).should('exist')*/

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span', { timeout: 30000 })
        .should('have.length', '2')
        
    })//tempo de resposta caso o sistema esteja com lentidão

    it.only('Click retry', () => {

        cy.get('#buttonCount')
        .click()
        .should('have.value', '1')
    })

    

})//fim do describe


