import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", () => {
  cy.visit("https://www.saucedemo.com/");
});

When("I enter a valid username and password", () => {
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
});

When("I enter an invalid username or password", () => {
  cy.get('[data-test="username"]').type("invalid_user");
  cy.get('[data-test="password"]').type("wrong_password");
  cy.get('[data-test="login-button"]').click();
});

Then("I should be redirected to the inventory page", () => {
  cy.url().should("include", "/inventory.html");
});

Then("I should see an error message", () => {
  cy.get('[data-test="error"]').should("be.visible");
});
