/// <reference types="cypress" />

describe('Work with POP UP', () => {

    it('Deve preencher pop up diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })        

    })//testar o conteudo da pop up isoladamente

    it('Deve verificar se o pop up foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        cy.window().then(win =>{
            cy.stub(win,'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called') //retorna o stub
        
    })//pop up foi chamada p/teste   
})

describe.only('With links', () => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Check popup url', () => {
        cy.contains('Popup2')
        .should('have.prop', 'href')
        .and('equal', 'https://wcaquino.me/cypress/frame.html')
    })    

    it('Should access popup dinamically', () => {
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('Funciona')
        })//link do popup nao fixo
    })//acessar o pop up pela url

    it('should force link on same page', () => {
        cy.contains('Popup2')
        .invoke('removeAttr', 'target')
        .click()

        cy.get('#tfield').type('Funciona')

    })//abrindo link na mesma pag

})