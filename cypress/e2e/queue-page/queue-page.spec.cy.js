describe('Тестирование компонента Очередь', () => {
    it('Если в инпуте пусто, кнопка "добавить" будет не активна', () => {
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled');
    })

    it('Проверка добавления элемента', () => {
        cy.clock()
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('1')
        cy.tick(250);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('tail');
        cy.get('input[type="text"]').type('2').should('have.value', '2');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1')
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('2')
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1')
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('2')
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('tail');
    })

    it('Проверка удаления элемента', () => {
        cy.clock()
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('1')
        cy.tick(250);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('tail');
        cy.get('input[type="text"]').type('2').should('have.value', '2');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1')
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('2')
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1')
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('2')
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('tail');
        cy.tick(250);
        cy.get('button').contains('Удалить').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('1');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('2');
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('tail');
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').should('have.text', '');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('2');
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('tail');
    })

    it('Проверка очистки очереди', () => {
        cy.clock()
        cy.visit('http://localhost:3000/queue').get('input[type="text"]').type('1').should('have.value', '1');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('1')
        cy.tick(250);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('tail');
        cy.get('input[type="text"]').type('2').should('have.value', '2');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1')
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('2')
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1')
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('2')
        cy.get('div[class*="circle_content"]').should('have.length', 7);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('tail');
        cy.get('button').contains('Очистить').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 7)
        cy.get('div[class*="circle_circle"]').should('have.text', '');
        cy.get('button[type="submit"]').should('have.disabled');
        cy.get('button').contains('Удалить').parent().should('have.disabled');
        cy.get('button').contains('Очистить').parent().should('have.disabled');
    })
})