//O bloco describe define a suite de testes e o bloco it define o caso de teste.
describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title('Central de Atendimento ao Cliente TAT')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.title().should('include', 'Cliente')
  })

   it.only('preenche os campos obrigatórios e envia o formulário', () => {
    /*MINHA SOLUÇÃO
    cy.get('input[name="firstName"]')
    .as('firstName')
    .type('João')

    cy.get('input[name="lastName"]')
    .as('lastName')
    .type('Klunk')

    cy.get('input[id="email"]')
    .as('email')
    .type('joao@teste.com.br')  

    cy.get('textarea[name="open-text-area"]')
    .as('feedback')
    .type('Feedback teste!')

    cy.get('button[type="submit"]')
    .as('submit')
    .click()

    cy.get('span[class="sucess"]')
    .as('sucess')
    cy.get('@sucess')
    .should('be.visible')*/

    //SOLUÇÃO DO PROFESSOR
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#open-text-area').type('Elogio teste')
    cy.get('button[type="submit"]').click()

    cy.get('.success > strong').should('be.visible')
  })
})

