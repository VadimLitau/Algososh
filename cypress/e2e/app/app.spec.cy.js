describe('Тестирование работоспособности приложения', function() {
    it('Приложение поднялось', () => {
        cy.visit('http://localhost:3000');

        cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ')
    });
});