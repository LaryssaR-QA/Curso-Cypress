/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {

    })//login sistem

    beforeEach(() => {
        // cy.resetRest()
    })//clean


    it('Should create an account ',  () => {
         cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: Cypress.env('email'),
                redirecionar: false,
                senha: Cypress.env('password')
            }

        }).its("body.token").should("not.be.empty")//not vazio
            .then( token => {
                 cy.request({

                    url: 'https://barrigarest.wcaquino.me/contas',
                    method: 'POST',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'Conta via rest'
                    }
                }).as('response')
            })

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })    
})


it('Should update an account', () => {
})

it('Should not create an account with same name', () => {
})

it('should create a transaction', () => {
})


})
