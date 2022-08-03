/// <reference types="cypress" />

describe('Helpers...', () => {

    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20}
        expect(obj).to.have.property('nome') //assertiva 

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
        cy.wrap(obj).should('have.property', 'nome', 'User')//assertiva 
        cy.wrap(obj).its('nome').should('be.equal', 'User')//assertiva 

        const obj2 = { nome: 'User', idade: 20, endereco:{rua: 'Areateste'} }
        
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')//assertiva 
        cy.wrap(obj2).its('endereco').its('rua').should('contain', 'teste')//assertiva 
        cy.wrap(obj2).its('endereco.rua').should('contain', 'teste')//assertiva 

        cy.visit('https://wcaquino.me/cypress/componentes.html')   
        cy.title().its('length').should('be.equal', 20)// caracter igual a 20

        })//its

        it.only('Invoke ...', () => {
            const getValue = () => 1;
            const soma = (a,b) => a + b;

            cy.wrap({ fn: getValue}).invoke('fn')//obj com função
            .should('be.equal', 1)// assertiva 

            cy.wrap({ fn: soma}).invoke('fn', 2, 5)
            .should('be.equal',7)

            cy.visit('https://wcaquino.me/cypress/componentes.html') 
            cy.get('#formNome').invoke('val', 'Texto via INVOKE')  

            cy.window().invoke('alert', 'Dá pra ver?') //script na janela de aplicação

            cy.get('#resultado')
            .invoke('html', '<input type = "button", value = "Hacked!"/>')

            let syncTitle


            cy.title().then(title => {
                console.log(title)
   
                cy.get('[data-cy=dataSobrenome]').type(title)
                syncTitle = title              
            })

            cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').then($el =>{
                $el.val(syncTitle)
            })

            cy.get(':nth-child(2) > :nth-child(6) > input').then($el => {
                cy.wrap($el).type(syncTitle)

            })

        })//trabalha com funções com html





})//describe fim   