describe('Search Product', () => {
  beforeEach(() => {
    cy.visit('https://automationexercise.com');
  });

  it('Text Case 9: search and display related results', () => {
    cy.get('body').should('contain', 'Home');
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
    cy.get('.title.text-center').should('contain', 'All Products');
    cy.get('#search_product').type('dress');
    cy.get('#submit_search').click();
  });
});
