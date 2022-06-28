/// <reference types="cypress" />

describe('Should test at a functional level',() => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/')

        cy.get('.input-group > .form-control').type('LaryssaFernandaR@hotmail.com')
        cy.get(':nth-child(2) > .form-control').type('12346')

        cy.get('.btn').click()

        cy.get('.toast-message').should('contain', 'Bem vindo')//validation login
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE all"

    it('Should create an account ', () => {

        cy.get('[data-test=menu-settings] > .fas').click()
        cy.get('[href="/contas"]').click()

        cy.get('[data-test=nome]').type('Nuconta teste')
        cy.get('.btn').click()

        cy.get('.toast-message').should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.get('[data-test=menu-settings] > .fas').click()
        cy.get('[href="/contas"]').click()

        cy.xpath("//table//td[contains(., 'Nuconta teste')]/..//i[@class='far fa-edit']").click()
        cy.get('[data-test=nome]')
            .clear()
            .type('Nuconta teste ALTERADA')
        cy.get('.btn').click()

        cy.get('.toast-message').should('contain', 'Conta atualizada com sucesso')

    })//modo de alteração ñ eficaz pois depende do test anterior para concluir o novo test


})

