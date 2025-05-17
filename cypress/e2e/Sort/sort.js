import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
// Import the shared login steps once, do NOT redefine login steps here
import "../steps/steps.js";

When("I sort products from Z to A", () => {
  cy.get('[data-test="product-sort-container"]').select("za");
});

When("I sort products by price low to high", () => {
  cy.get('[data-test="product-sort-container"]').select("lohi");
});

When("I sort products by price high to low", () => {
  cy.get('[data-test="product-sort-container"]').select("hilo");
});

Then("the products should be sorted by name in descending order", () => {
  cy.get(".inventory_item_name").then(($items) => {
    const names = [...$items].map((el) => el.innerText);
    const sorted = [...names].sort().reverse();
    expect(names).to.deep.equal(sorted);
  });
});

Then("the products should be sorted by price in ascending order", () => {
  cy.get(".inventory_item_price").then(($prices) => {
    const priceValues = [...$prices].map((el) =>
      parseFloat(el.innerText.replace("$", ""))
    );
    const sorted = [...priceValues].sort((a, b) => a - b);
    expect(priceValues).to.deep.equal(sorted);
  });
});

Then("the products should be sorted by price in descending order", () => {
  cy.get(".inventory_item_price").then(($prices) => {
    const priceValues = [...$prices].map((el) =>
      parseFloat(el.innerText.replace("$", ""))
    );
    const sorted = [...priceValues].sort((a, b) => b - a);
    expect(priceValues).to.deep.equal(sorted);
  });
});
