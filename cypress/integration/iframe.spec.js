/// <reference types="cypress" />

describe('Work with iFrames',() => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE all"

    beforeEach(() => {
        cy.reload()
        
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE EACH"

    it('Deve preencher campo de texto', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.get('#frame1').then(iframe => {
            const body = iframe.contents().find('body')//var

            cy.wrap(body).find('#tfield')
            .type('funciona?')
            .should('have.value', 'funciona?')

            cy.on('window:alert', msg => {
                expect(msg).to.be.equal('Alert Simples')
            })
            //cy.wrap(body).find('#otherButton').click()
        })   
    })//janela externa

    it('Deve testar o Frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()

        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
        
    })//janela externa

})