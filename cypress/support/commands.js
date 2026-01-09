//SEÇÃO 3, EXERCÍCIO EXTRA 7 - 1ª VERSÃO
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})

//SEÇÃO 3, EXERCÍCIO EXTRA 7 - 2ª VERSÃO
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})

//SEÇÃO 3, EXERCÍCIO EXTRA 7 - 3ª VERSÃO
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Sinara',
    lastName: 'Moura',
    email: 'si@si.com.br',
    text: 'teste'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})