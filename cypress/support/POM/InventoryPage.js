class InventoryPage {
    verifyInventoryPage() {
      cy.url().should("include", "/inventory.html");
      cy.get(".inventory_item").should("have.length.greaterThan", 0);  // Ensures there are inventory items
    }
  
    addItem(itemName) {
      cy.get(".inventory_item_name").contains(itemName).parents(".inventory_item").find("button").click();
    }
  
    removeItem(itemName) {
      cy.get(".inventory_item_name").contains(itemName).parents(".inventory_item").find("button").click();
    }
  
    openCart() {
      cy.get(".shopping_cart_link").click();
    }
  
    // Open side menu with force click to bypass possible overlay issues
    openSideMenu() {
      cy.get("#react-burger-menu-btn").click({ force: true });
      cy.get(".bm-menu").should("be.visible");
    }
  
    // Close side menu with force click to ensure it is clickable
    closeSideMenu() {
      cy.get(".bm-menu").should("be.visible");
      cy.get("#react-burger-menu-btn").click({ force: true }); // Force click to close the menu
      cy.get(".bm-menu").should("not.be.visible");
    }
  
    sortBy(optionValue) {
      cy.url().should("include", "/inventory.html");  // Ensure we are on the inventory page before selecting sort
      cy.get('[data-test="product_sort_container"]', { timeout: 15000 })  // Increased timeout for element loading
        .should("be.visible")  // Ensure the element is visible before interacting
        .select(optionValue, { force: true });  // Select the sorting option, with force click to bypass potential issues
    }
  
    openItemDetails(itemName) {
      cy.get(".inventory_item_name").contains(itemName).click();
    }
  }
  
  export default new InventoryPage();
  