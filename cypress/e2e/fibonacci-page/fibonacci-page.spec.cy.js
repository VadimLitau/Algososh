describe('Тестирование последовательности Фибоначчи', () => {
    it('Если в инпуте пусто, кнопка "рассчитать" будет не активна', () => {
        cy.visit('http://localhost:3000/fibonacci').get('input[type="text"]').should('have.value', '');
        cy.get('button[type="submit"]').should('have.disabled');
    })

    it('Проверка корректности генерации чисел', () => {
        cy.clock();
        cy.visit('http://localhost:3000/fibonacci').get('input[type="text"]').type('5').should('have.value', '5');
        cy.get('button[type="submit"]').click();
        cy.tick(250);
        cy.get('div[class*="circle_circle"]').should('have.length', 1);
        cy.get('div[class*="circle_circle"]')
            .eq(0).contains('1')
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 2);
        cy.get('div[class*="circle_circle"]').eq(0).contains('1');
        cy.get('div[class*="circle_circle"]').eq(1).contains('1');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 3);
        cy.get('div[class*="circle_circle"]').eq(0).contains('1');
        cy.get('div[class*="circle_circle"]').eq(1).contains('1');
        cy.get('div[class*="circle_circle"]').eq(2).contains('2');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 4);
        cy.get('div[class*="circle_circle"]').eq(0).contains('1');
        cy.get('div[class*="circle_circle"]').eq(1).contains('1');
        cy.get('div[class*="circle_circle"]').eq(2).contains('2');
        cy.get('div[class*="circle_circle"]').eq(3).contains('3');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 5);
        cy.get('div[class*="circle_circle"]').eq(0).contains('1');
        cy.get('div[class*="circle_circle"]').eq(1).contains('1');
        cy.get('div[class*="circle_circle"]').eq(2).contains('2');
        cy.get('div[class*="circle_circle"]').eq(3).contains('3');
        cy.get('div[class*="circle_circle"]').eq(4).contains('5');
        cy.tick(500);
        cy.get('div[class*="circle_circle"]').should('have.length', 6);
        cy.get('div[class*="circle_circle"]').eq(0).contains('1');
        cy.get('div[class*="circle_circle"]').eq(1).contains('1');
        cy.get('div[class*="circle_circle"]').eq(2).contains('2');
        cy.get('div[class*="circle_circle"]').eq(3).contains('3');
        cy.get('div[class*="circle_circle"]').eq(4).contains('5');
        cy.get('div[class*="circle_circle"]').eq(5).contains('8');
        cy.tick(500);
    })
})