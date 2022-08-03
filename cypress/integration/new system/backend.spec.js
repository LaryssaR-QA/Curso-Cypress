/// <reference types="cypress" />

describe('Should test at a functional level', () => {
    before(() => {

    })//login sistem

    beforeEach(() => {
        // cy.resetRest()
    })//clean


    it('Should create an account ', async () => {
        await cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "LaryssaFernandaR@hotmail.com",
                redirecionar: false,
                senha: "12346"
            }

        }).its("body.token").should("not.be.empty")//not vazio
            .then(async token => {
                await cy.request({

                    url: 'https://barrigareact.wcaquino.me/contas',
                    method: 'POST',
                    headers: { Authorization: `JWT ${token}`, 'Accept': 'application/json' },
                    body: {
                        nome: 'Conta via rest'
                    }
                }).then((res) => console.log(res));

                /*.as('response')

                    cy.get('@response').then(res => {
                    expect(res.status).to.be.equal(201)
                    expect(res.body).to.have.property('id')
                    expect(res.body).to.have.property('nome', 'Conta via rest')
                })*/

            })
    })


    it('Should update an account', () => {
    })

    it('Should not create an account with same name', () => {
    })

    it('should create a transaction', () => {
    })


})
