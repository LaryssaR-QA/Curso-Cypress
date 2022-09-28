/// <reference types="cypress" />
import dayjs from "dayjs"; //biblioteca 

describe('Should test at a functional level', () => {
    let token

    before(() => {
        cy.getToken('email','password')
        .then(tkn => {
            token = tkn
        })
    })//login sistema

    beforeEach(() => {
        cy.resetRest()
    })//clean
    
    it('create an account ',  () => {  
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta via rest'
                }
            }).as('response')
            
        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })   
    })// end create

    it('update an account', () => {
        cy.getContasByName('Conta para alterar')
        .then(contaId => {
            cy.request({
                url: `contas/${contaId}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    nome: 'onta alterada via rest'
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal',200)
    })//end update

    it('Should not create an account with same name', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: 'Conta mesmo nome',
                },

            failOnStatusCode: false  //validar testes com erro

            }).as('response')
            
        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.have.equal('Já existe uma conta com esse nome!')
        })
    })

    it('should create a transaction', () => {
        cy.getContasByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                url: '/transacoes',
                method: 'POST',
                headers: { Authorization: `JWT ${token}` },
                body: {
                    conta_id: contaId,
                    data_pagamento: dayjs().format('DD/MM/YYYY'), // formatacao data atualizada
                    data_transacao: dayjs().format('DD/MM/YYYY'), //formatação data atualizada
                    descricao: "desc",
                    envolvido: "bank",
                    status: true,
                    tipo: "REC", //receita
                    valor: "6000"
                }, 
            }).as('response') 
        })
        failOnStatusCode: false  //validar testes com erro  
        cy.get('@response').its('status').should('be.equal', 201)  
        cy.get('@response').its('body.id').should('exist')
    })

    it('Should get balance', () => {
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}`}
            }).then(res => {
            let saldoConta = null //var

            res.body.forEach(c => {
                if(c.conta == 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })

        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'PUT',
                headers: { Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: dayjs(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: dayjs(res.body[0].data_pagamento).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id
                }
            }).its('status').should('be.equal', 200)
        })
        
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}`}
            }).then(res => {
            let saldoConta = null //var

            res.body.forEach(c => {
                if(c.conta == 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })
    })

    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            headers: { Authorization: `JWT ${token}`},
            qs: { descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                headers: { Authorization: `JWT ${token}`},
            }).its('status').should('be.equal',204)
        })
    })

})//Describe
