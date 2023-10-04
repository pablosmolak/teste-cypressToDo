/// <reference types="cypress" />

describe('Aplicativo de tarefas cypress',() =>{

    beforeEach(()=>{
        cy.visit('https://example.cypress.io/todo')
    })

    it('Deve exibe os itens de tarefas por padrão do aplicativo', () => {
        cy.get('.todo-list li').should('have.length',2)
        cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
        cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
    })

    it('Deve adicionar um novo itens de tarefas', () => {
        cy.get('.new-todo').type(`Ver Lapada Seca {enter}`)
        cy.get('.todo-list li').last().should('have.text', 'Ver Lapada Seca')
        cy.get('.todo-list li').should('have.length',3)
    })

    it('Deve marcar um item como concluído', () => {
        cy.get('.new-todo').type(`Terminar as atividades a tempo {enter}`)
        cy.contains('Terminar as atividades a tempo').parent().find('input[type=checkbox]').check()
    })

    context('Usando uma tarefa verificada', () => {

            beforeEach(() => {
            cy.contains('Pay electric bill').parent().find('input[type=checkbox]').check()
            })

            it('Deve filtrar tarefas incompletas', () => {
                cy.contains('Active').parent().find('a').click()
                cy.contains('Walk the dog')
                cy.contains('Pay electric bill').should('not.exist')
            })

            it('Deve filtrar por tarefas concluídas', ()=>{
                cy.contains('Completed').parent().find('a').click()
                cy.contains("Pay electric bill")
                cy.contains('Walk the dog').should('not.exist')
            })

            it('Deve excluir todas as tarefas concluídas', ()=>{
                cy.contains('Completed').parent().find('a').click()
                cy.contains('Clear completed').click()
                cy.get('.todo-list li').should('have.length',0)
                cy.contains('Clear completed').should('not.exist')

            })

    })

})