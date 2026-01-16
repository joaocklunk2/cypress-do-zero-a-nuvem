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

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error > strong')
      .should('be.visible')
  })

  //SEÇÃO 3, EXERCÍCIO EXTRA 7 - 1ª VERSÃO
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  //SEÇÃO 3, EXERCÍCIO EXTRA 7 - 2ª VERSÃO
  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'João',
      lastName: 'Klunk',
      email: 'joao@teste.com.br',
      text: 'teste'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('.success').should('be.visible')
  })

//SEÇÃO 3, EXERCÍCIO EXTRA 7 - 3ª VERSÃO - Posso colocar um objeto conforme a versão 2, senão colocar ele pega o objeto que está no comando customizado
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  //SEÇÃO 3, EXERCÍCIO EXTRA 8
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')
  })

  //SEÇÃO 4 - EXERCÍCIO 1
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  //SEÇÃO 4 - EXERCÍCIO EXTRA 1 
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  //SEÇÃO 4 - EXERCÍCIO EXTRA 2 
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  //SEÇÃO 5 AULA 4 - EXERCÍCIO 
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  //SEÇÃO 5 AULA 4 - EXERCÍCIO EXTRA
  //MINHA SOLUÇÃO
  it('marca cada tipo de atendimento "MINHA SOLUÇÃO"', () => {
    cy.get('input[type="radio"]')
      .each(($ajuda, $elogio, $feedback) => {
        cy.wrap($ajuda, $elogio, $feedback)
          .check()
          .should('be.checked')
    })
  })

  //SOLUÇÃO DO PROFESSOR 
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
    })
  })

  //SEÇÃO 6 AULA 5 - EXERCÍCIO
  //MINHA SOLUÇÃO
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .as('checkboxes')  
      .check()
      .should('be.checked').last()

    cy.get('@checkboxes')
      .each(checkbox => {
    })
      .last()
      .uncheck()
      .should('not.be.checked')    
  })

  //SOLUÇÃO DO PROFESSOR 
  it('marca ambos checkboxes, depois desmarca o último 2', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //SEÇÃO 6 AULA 5 - EXERCÍCIO EXTRA
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário "COM CHECK"', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong').should('be.visible')    
  })

  //SEÇÃO 7 AULA 6 - EXERCÍCIO
  //MINHA SOLUÇÃO
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json') 
      .then(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //SOLUÇÃO DO PROFESSOR
  it('seleciona um arquivo da pasta fixtures 2', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json') 
      .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')  
      })
      
  })

  //SEÇÃO 7 AULA 6 - EXERCÍCIO EXTRA 1
  //DRA-DROP SIMULA O USUÁRIO ARRASTANDO O ARQUIVO
  it('seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) 
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')  
      })  
  })

  //SEÇÃO 7 AULA 6 - EXERCÍCIO EXTRA 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('example')
    cy.get('input[type="file"]')
      .selectFile('@example')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  //SEÇÃO 8 AULA 7 - EXERCÍCIO
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  //SEÇÃO 8 AULA 7 - EXERCÍCIO EXTRA 1
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
      //.shold('not.have.value', 'target', '_blank')
  })

  //SEÇÃO 8 AULA 7 - EXERCÍCIO EXTRA 2 - EXERCICIO NO ARQUIVO PRIVACYPOLICY.CY.JS

  //SEÇÃO 13 AULA 12 - EXERCÍCIO
  it('preenche os campos obrigatórios e envia o formulário - Com congelamento de tempo', () => {
    cy.clock()
    const longText = Cypress._.repeat('Joao', 5)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)
    cy.get('.success').should('be.not.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida - Com congelamento de tempo', () => {
    cy.clock()
    const longText = Cypress._.repeat('Joao', 5)
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joaoteste')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)
    cy.get('.error > strong').should('be.not.visible')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário - Com congelamento de tempo', () => {
    cy.clock()
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Klunk')
    cy.get('#email').type('joao@email.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error > strong').should('be.visible')

    cy.tick(3000)
    cy.get('.error > strong').should('be.not.visible')
  })

  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios - Com congelamento de tempo', () => {
    cy.clock()
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error > strong')
      .should('be.visible')
    cy.tick(3000)
    cy.get('.error > strong')
      .should('be.not.visible')
  })
  
})

