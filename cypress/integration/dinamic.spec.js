/// <reference types="cypress" />

describe('Dinamic tests',() => {
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE EACH"

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']//arry
    
    foods.forEach(food => {
        it(`Cadastro com comida ${food}`, () => {
            cy.get('#formNome').type('Laryssa')
            cy.get('#formSobrenome').type('Ribeiro')   
            cy.get(`[name=formSexo][value=F]`).click()
            cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Corrida')
    
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    })//teste dinamico

    it.only('Deve selecionar todos usando o each', () => {
        
        cy.get('#formNome').type('Laryssa')
        cy.get('#formSobrenome').type('Ribeiro')   
        cy.get(`[name=formSexo][value=F]`).click()

        cy.get('[name=formComidaFavorita]').each($el => {
            if($el.val() != 'vegetariano' )
            cy.wrap($el).click()
        })

        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
    
        cy.get('#formCadastrar').click()
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        
        //cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    })


})
    
  

