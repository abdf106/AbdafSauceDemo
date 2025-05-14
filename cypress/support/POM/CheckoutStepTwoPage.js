class CheckoutStepTwoPage {
  verifySummaryVisible() {
    cy.get(".summary_info").should("be.visible");
  }
}

export default new CheckoutStepTwoPage();
