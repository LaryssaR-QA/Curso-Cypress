/// <reference types="cypress" />

describe('Work with basic elements',() => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE all"

    beforeEach(() => {
        cy.reload()
        
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE EACH"

    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...').debug


    })//verificar se o texto existe na pag

    it.only('Links', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

        cy.reload()
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')

    })

    it.only('TextFields', () => {
        cy.get('#formNome').type('Cypress Test')
        cy.get('#formNome').should('have.value', 'Cypress Test')


        cy.get('#elementosForm\\:sugestoes')
        .type('Cypress Test area sugestão')
        .should('have.value', 'Cypress Test area sugestão')

        cy.get(':nth-child(3) > :nth-child(6) > input')
        .type('campo de Texto',{delay:100})
        .should('have.value','campo de Texto')
  
    })// Preenchimento nas caixas de texto "Text BOX"  
  
    
    it.only('RadioButton', () =>{
        cy.get('#formSexoFem')
        .click()
        .should('be.checked')//acertiva

        cy.get('#formSexoMasc')
        .should('not.be.checked')//verificar se o masculuno não está selecionado

        cy.get("[name='formSexo']").should('have.length', 2)  


    })//clique nas caixas de seleção
})
