/// <reference types="cypress" />

describe('Helpers...', () => {

    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20}
        expect(obj).to.have.property('nome') //acertiva

        cy.wrap(obj).should('have.property', 'nome')

        cy.visit('https://wcaquino.me/cypress/componentes.html')        
        /*cy.get('#formNome').type('funcion?')  

        cy.get('#formNome').then($el => {
           // $el.val('funciona via jquery')
            cy.wrap($el).type('Funciona via cypress')
        })*/

        const promise = new Promise(function (resolve, reject) {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('encontrei o primeiro botão'))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonList').then(() => console.log('encontrei o segundo botão'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)
    })//wrap

        it.only('ITs...', () => {
        const obj = { nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')//acertiva
        cy.wrap(obj).its('nome').should('be.equal', 'User')//acertiva

        const obj2 = { nome: 'User', idade: 20, endereco:{rua: 'Areateste'} }
        
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')//acertiva
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'teste')//acertiva
        cy.wrap(obj2).its('endereco.rua').should('contain', 'teste')//acertiva

        cy.visit('https://wcaquino.me/cypress/componentes.html')   
        cy.title().its('length').should('be.equal', 20)// caracter igual a 20

        })//its


})//describe fim   