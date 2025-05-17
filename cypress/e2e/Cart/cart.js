import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../steps/steps.js";


When("I add {string} to the cart", (itemName) => {
  cy.get('.inventory_item').contains(itemName).parents('.inventory_item').within(() => {
    cy.contains('Add to cart').click();
  });
});

When("I add {string} and {string} to the cart", (item1, item2) => {
  [item1, item2].forEach((itemName) => {
    cy.get('.inventory_item').contains(itemName).parents('.inventory_item').within(() => {
      cy.contains('Add to cart').click();
    });
  });
});

Then("the cart badge should show {int}", (count) => {
  cy.get('.shopping_cart_badge').should('contain', count);
});
