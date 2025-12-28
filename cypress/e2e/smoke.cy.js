describe('Smoke Test', () => {
  it('Sprawdza czy strona główna się ładuje', () => {
    cy.visit('/');
    cy.get('h1').should('contain', 'Witaj na środowisku');
    cy.get('#status').should('have.text', 'Działa!');
  });
});