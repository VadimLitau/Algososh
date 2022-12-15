describe('Тестирование переходов по страницам', () => {
    it('Переход на страницу и возврат обратно', () => {
        cy.visit('http://localhost:3000');
        cy.get('a[href="/recursion"]').click().get('h3').should('have.text', 'Строка');
        cy.get('p[class="text text_type_button text_color_link ml-4"]').should('have.text', 'К оглавлению').click();

        cy.get('a[href="/fibonacci"]').click().get('h3').should('have.text', 'Последовательность Фибоначчи');
        cy.get('p[class="text text_type_button text_color_link ml-4"]').should('have.text', 'К оглавлению').click();

        cy.get('a[href="/sorting"]').click().get('h3').should('have.text', 'Сортировка массива');
        cy.get('p[class="text text_type_button text_color_link ml-4"]').should('have.text', 'К оглавлению').click();

        cy.get('a[href="/stack"]').click().get('h3').should('have.text', 'Стек');
        cy.get('p[class="text text_type_button text_color_link ml-4"]').should('have.text', 'К оглавлению').click();

        cy.get('a[href="/queue"]').click().get('h3').should('have.text', 'Очередь');
        cy.get('p[class="text text_type_button text_color_link ml-4"]').should('have.text', 'К оглавлению').click();

        cy.get('a[href="/list"]').click().get('h3').should('have.text', 'Связный список');
        cy.get('p[class="text text_type_button text_color_link ml-4"]').should('have.text', 'К оглавлению').click();
    })
})