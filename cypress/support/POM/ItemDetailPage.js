class ItemDetailPage {
  verifyDetails(name, price) {
    cy.get(".inventory_details_name").should("contain", name);
    cy.get(".inventory_details_price").should("contain", price);
  }
}

export default new ItemDetailPage();
