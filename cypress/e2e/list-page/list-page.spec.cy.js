describe('Тестирование компонента "Связный список"', () => {
    it('Если в инпутах пусто, кнопки будут не активны', () => {
        cy.visit('http://localhost:3000/list').get('input[placeholder="Введите значение"]').should('have.value', '');
        cy.get('button').parent().contains('Добавить в head').should('have.disabled');
        cy.get('button').parent().contains('Добавить в tail').should('have.disabled');
        cy.get('input[placeholder="Введите индекс"]').should('have.value', '');
        cy.get('button').parent().contains('Добавить по индексу').should('have.disabled');
        cy.get('button').parent().contains('Удалить по индексу').should('have.disabled');
    })

    it('Отрисовка дефолтного списка', () => {
        cy.visit('http://localhost:3000/list').get('div[class*="circle_circle"]').should('have.length', 4);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(3).contains('tail');
    })

    it('Добавление элемента в head', () => {
        cy.clock()
        cy.visit('http://localhost:3000/list').get('input[placeholder="Введите значение"]').type('5');
        cy.get('button').parent().contains('Добавить в head').click();
        cy.tick(500);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('5').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
    })

    it('Добавление элемента в tail', () => {
        cy.clock()
        cy.visit('http://localhost:3000/list').get('input[placeholder="Введите значение"]').type('5');
        cy.get('button').parent().contains('Добавить в tail').click();
        cy.tick(500);
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('5').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(500);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('5');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
    })

    it('Добавление элемента по индексу', () => {
        cy.clock()
        cy.visit('http://localhost:3000/list').get('input[placeholder="Введите значение"]').type('5');
        cy.get('input[placeholder="Введите индекс"]').type('2');
        cy.get('button').parent().contains('Добавить по индексу').click();
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('5').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('5').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('0');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(2).contains('5').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('34');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(127, 224, 81)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('5');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
    })

    it('Удаление элемента из  head', () => {
        cy.clock()
        cy.visit('http://localhost:3000/list').get('button').parent().contains('Удалить из head').click();
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_content"]')
            .eq(1).contains('0').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)', ).should('have.text', '');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(2).contains('tail');
    })
    it('Удаление элемента из tail', () => {
        cy.clock()
        cy.visit('http://localhost:3000/list').get('button').parent().contains('Удалить из tail').click();
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('1').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').should('have.text', '');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_content"]')
            .eq(2).contains('tail');

    })
    it('Удаление элемента по индексу', () => {
        cy.clock()
        cy.visit('http://localhost:3000/list').get('input[placeholder="Введите индекс"]').type('2');
        cy.get('button').contains('Удалить по индексу').click();
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(3).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(3).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('8');
        cy.get('div[class*="circle_circle"]')
            .eq(3).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(3).contains('tail');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(210, 82, 225)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').should('have.text', '');
        cy.get('div[class*="circle_circle"]')
            .eq(4).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(4).contains('tail');
        cy.get('div[class*="circle_content"]')
            .eq(3).contains('8').parent().should('have.css', 'border-color', 'rgb(210, 82, 225)');
        cy.tick(1000);
        cy.get('div[class*="circle_content"]')
            .eq(0).contains('head');
        cy.get('div[class*="circle_circle"]')
            .eq(0).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('0');
        cy.get('div[class*="circle_circle"]')
            .eq(1).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('34');
        cy.get('div[class*="circle_circle"]')
            .eq(2).should('have.css', 'border-color', 'rgb(0, 50, 255)').contains('1');
        cy.get('div[class*="circle_content"]')
            .eq(2).contains('tail');
    })
})