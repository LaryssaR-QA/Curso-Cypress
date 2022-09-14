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
})

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
})

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
                data_pagamento: dayjs().format('DD/MM/YYYY'), // formatacao data 1 dia atualizado
                data_transacao: dayjs().format('DD/MM/YYYY'), //formatação data atualizada
                descricao: "desc",
                envolvido: "inter",
                status: true,
                tipo: "REC", //receita
                valor: "6000"
            }   
        }).as('response') 
     })
     cy.get('@response').its('status').should('be.equal', 201)  
     cy.get('@response').its('body.id').should('exist')
    })
})
