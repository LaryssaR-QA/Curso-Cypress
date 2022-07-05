/// <reference types="cypress" />

import loc from'../../support/locators'  //todos os locators estão na variavel loc
import '../../support/commandsConta'

describe('Should test at a functional level',() => {
    before(() => {
        cy.login('LaryssaFernandaR@hotmail.com', '12346')
        cy.resetApp() //clear

    })//login sistem

    it('Should create an account ', () => {
        cy.AcessarMenuConta()
        cy.InserirContas('Conta de teste')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })

    it('Should update an account', () => {
        cy.AcessarMenuConta()

        cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
        cy.get(loc.CONTAS.NOME)
            .clear()
            .type('Conta teste ALTERADA')

        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso')
    })

    it('Should not create an account with same name', () => {
        cy.AcessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta teste ALTERADA')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')

    })

    it('should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();

        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('CAD Movimentacao')
        cy.get(loc.MOVIMENTACAO.VALOR).type('800.00')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Algume banco')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

    cy.get(loc.MESSAGE).should('contain', 'sucesso')

    })

})

