//O bloco describe define a suite de testes e o bloco it define o caso de teste.

describe('Central de Atendimento ao Cliente TAT', () => {
  it('verifica o título da aplicação', () => {
    cy.visit('./src/index.html')
    cy.title('Central de Atendimento ao Cliente TAT')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.title().should('include', 'Cliente')

  })
})