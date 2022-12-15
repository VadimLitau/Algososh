describe('Тестирования разворота строки', () => {
    it('Если в инпуте пусто, кнопка "развернуть" будет не активна', () => {
        cy.visit('http://localhost:3000/recursion').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled');
    })

    it('Тестирование правильной визуализации алгоритма', () => {
        cy.clock();
        cy.visit('http://localhost:3000/recursion').get('input[type="text"]').type('abcd').should('have.value', 'abcd');
        cy.get('button[type="submit"]').click();
        cy.get('div[class*="circle_circle"]').should('have.length', 4);
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('a')
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('b')
        cy.get('div[class*="circle_circle"]')
            .eq(2)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('c')
        cy.get('div[class*="circle_circle"]')
            .eq(3)
            .should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('d')
        cy.tick(1000);
        cy.get('div[class*="circle_circle"]').should('have.length', 4);
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('d')
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('b')
        cy.get('div[class*="circle_circle"]')
            .eq(2)
            .should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('c')
        cy.get('div[class*="circle_circle"]')
            .eq(3)
            .should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('a')
        cy.tick(1000);
        cy.get('div[class*="circle_circle"]').should('have.length', 4);
        cy.get('div[class*="circle_circle"]')
            .eq(0)
            .should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('d')
        cy.get('div[class*="circle_circle"]')
            .eq(1)
            .should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('c')
        cy.get('div[class*="circle_circle"]')
            .eq(2)
            .should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('b')
        cy.get('div[class*="circle_circle"]')
            .eq(3)
            .should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('a')
    })
})