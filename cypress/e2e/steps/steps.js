// e2e/steps/loginSteps.js
import { Given } from "@badeball/cypress-cucumber-preprocessor";

Given("I am logged in with valid credentials", () => {
  cy.visit("https://www.saucedemo.com/");
  cy.get('[data-test="username"]').type("standard_user");
  cy.get('[data-test="password"]').type("secret_sauce");
  cy.get('[data-test="login-button"]').click();
  cy.url().should("include", "/inventory.html");
});
