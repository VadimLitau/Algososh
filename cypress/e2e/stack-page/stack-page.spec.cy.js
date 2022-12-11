describe('Тестирование компонента Стек', () => {
    it('Если в инпуте пусто, кнопка "добавить" будет не активна', () => {
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled');
    })

    it('Проверка добавления элемента в Стек', () => {
        cy.clock();
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').type('5').should('have.value', '5');
        cy.get('button[type="submit"]').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 1);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('5');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('input[type="text"]').type('6').should('have.value', '6');
        cy.get('button[type="submit"]').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 2);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('6');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 2);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('6');
        cy.get('input[type="text"]').type('7').should('have.value', '7');
        cy.get('button[type="submit"]').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 3);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('6');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('7');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 3);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('6');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('7');
    })

    it('Проверка удаления элемента из Стека', () => {
        cy.clock();
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').type('5').should('have.value', '5');
        cy.get('button[type="submit"]').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 1);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('5');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.tick(500);
        cy.get('button').contains('Удалить').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 1);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('5');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 0);

    })

    it('Проверка Очистки Стека', () => {
        cy.clock();
        cy.visit('http://localhost:3000/stack').get('input[type="text"]').type('5').should('have.value', '5');
        cy.get('button[type="submit"]').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 1);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('5');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.tick(500);
        cy.get('button').contains('Очистить').click();
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 0);
        cy.get('button[type="submit"]').should('have.disabled');
        cy.get('button[type="submit"]').should('have.disabled');
    })
})