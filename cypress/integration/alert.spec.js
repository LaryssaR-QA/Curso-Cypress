/// <reference types="cypress" />

describe('Work with alerts',() => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE all"

    beforeEach(() => {
        cy.reload()
        
    })//Em todos os Tests deve conter boas praticas no codigo "BEFORE EACH"

    it("Alert", () => {
        cy.get('#alert').click()
        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')

        })//evento
    })//pop up 


    it.only("Alert com Mork", () => {
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
         expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })//pop up com com metodo mock

    it.only("Confirm", () => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })//botão confirmar

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })//alerta pop up
        cy.get('#confirm').click()

    }) //cenario OK pop up confirm

    it.only("Deny", () => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false //p/clicar opcão CANCELAR
        })//botão confirmar

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })//alerta pop up
        cy.get('#confirm').click()

    }) //cenario Cancela pop up confirm



})