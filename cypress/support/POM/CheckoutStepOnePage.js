class CheckoutStepOnePage {
  fillInfo(firstName, lastName, zipCode) {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(zipCode);
  }

  clickContinue() {
    cy.get('[data-test="continue"]').click();
  }

  clickCancel() {
    cy.get('[data-test="cancel"]').click();
  }
}

export default new CheckoutStepOnePage();
