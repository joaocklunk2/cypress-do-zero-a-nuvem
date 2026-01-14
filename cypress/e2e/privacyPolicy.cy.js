
//SEÇÃO 8 AULA 7 - EXERCÍCIO EXTRA 2 - EXERCICIO NO ARQUIVO PRIVACYPOLICY.CY.JS
it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
})

