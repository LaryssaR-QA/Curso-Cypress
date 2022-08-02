/// <reference types="cypress" />

describe('Should test at a functional level',() => {
    before(() => {
      
    })//login sistem

    beforeEach(() => {
       // cy.resetRest()
    })//clean

    it('Should create an account ', () => { 
       cy.request({
            method: 'POST',
            url:'https://barrigarest.wcaquino.me/signin',
            body: {
                email:"LaryssaFernandaR@hotmail.com",
                redirecionar: false,
                senha: "12346"
            }
       }).its('body.token').should('not.be.empty')//not vazio
         .then(token => { 
            cy.request({
                url: 'https://barrigarest.wcaquino.me/contas',
                method: 'POST',
                headers: { Autorization: `JWT ${token}`},
                body: {
                    nome:'Conta via rest'
                }
            }).then(res => console.log(res))
        })
   })

            


    it('Should update an account', () => {  

    })

    it('Should not create an account with same name', () => {

    })

    it('should create a transaction', () => {

    })
       

})
