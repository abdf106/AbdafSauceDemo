import LoginPage from "./POM/LoginPage";
import InventoryPage from "./POM/InventoryPage";

Cypress.Commands.add("login", (username, password) => {
  LoginPage.login(username, password);
});

Cypress.Commands.add("logout", () => {
  cy.get("body").then(($body) => {
    if ($body.find("#react-burger-menu-btn").length > 0) {
      cy.get("#react-burger-menu-btn").should("be.visible").click();
      cy.get("#logout_sidebar_link").should("be.visible").click();
    } else {
      cy.log("Logout skipped: Not on a page with a menu button");
    }
  });
});


Cypress.Commands.add("addItemToCart", (itemName) => {
  InventoryPage.addItem(itemName);
});

Cypress.Commands.add("removeItemFromCart", (itemName) => {
  InventoryPage.removeItem(itemName);
});
