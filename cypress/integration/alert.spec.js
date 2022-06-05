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
    })


    it.only("Alert com Mork", () => {
        const stub = cy.stub().as('alerta')

        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
         expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })//Alert up com com metodo mock

    it.only("Confirm", () => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
        })//botão confirmar

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirmado')
        })//alerta Confirm
        cy.get('#confirm').click()

    }) //cenario OK confirm

    it.only("Deny", () => {
        cy.on('window:confirm', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Confirm Simples')
            return false //p/clicar opcão CANCELAR
        })//botão confirmar

        cy.on('window:alert', msg => {
            console.log(msg)
            expect(msg).to.be.equal('Negado')
        })//alerta com window
        cy.get('#confirm').click()

    }) //cenario Cancela confirm


    it.only("Prompt", () => {

       cy.window().then(win => {
        cy.stub(win, 'prompt').returns('42')//stub 'generico'
       })//metodo de comportamento windowns

       cy.on('window:confirm', msg => {
        expect(msg).to.be.equal('Era 42?')
       })// verificações

       cy.on('window:alert', msg =>{
           expect(msg).to.be.equal(':D')
       })//verificações
        cy.get('#prompt').click()
    }) //cenario Prompt

    it.only('Validando mensagens', () => {
        const stub = cy.stub().as('alerta')
        cy.on('window:alert', stub)

        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Lary')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy=dataSobrenome]').type('Ribeiro')
        cy.get('#formCadastrar').click()
            .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoFem').click()
        cy.get('#formCadastrar').click()

            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })//validando as mensagens

})