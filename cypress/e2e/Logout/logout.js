import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import "../steps/steps.js";

When("I click on the logout button", () => {
  cy.get("#react-burger-menu-btn").click(); // Open menu
  cy.get("#logout_sidebar_link").should("be.visible").click(); // Click logout
});

Then("I should be redirected to the login page", () => {
  cy.url().should("eq", "https://www.saucedemo.com/");
  cy.get('[data-test="login-button"]').should("be.visible");
});
