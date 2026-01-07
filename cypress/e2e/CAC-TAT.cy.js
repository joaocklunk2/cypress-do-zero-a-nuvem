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

   it('preenche os campos obrigatórios e envia o formulário', () => {
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
    const longText = Cypress._.repeat('Joao', 100)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success > strong').should('be.visible')
  })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Joao', 100)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joaoteste')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error > strong').should('be.visible')
  })

    it('valida se o campo de telefone está vazio quando preenchido com um valor não numérico', () => {
    cy.get('#phone')
      .type('joaoteste')
      .should('have.value', '') //verifica se tem um valor no campo 
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error > strong').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Klunk')
      .should('have.value', 'Klunk')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('joao@email.com')
      .should('have.value', 'joao@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('51984183158')
      .should('have.value', '51984183158')
      .clear()
      .should('have.value', '')   
  })

  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error > strong')
      .should('be.visible')
  })

  




  
})

