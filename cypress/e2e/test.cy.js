
import LoginPage from '../support/POM/LoginPage';
import InventoryPage from '../support/POM/InventoryPage';
import CartPage from '../support/POM/CartPage';
import CheckoutStepOnePage from '../support/POM/CheckoutStepOnePage';
import CheckoutStepTwoPage from '../support/POM/CheckoutStepTwoPage';
import ItemDetailPage from '../support/POM/ItemDetailPage';

describe("SauceDemo Testing", () => {
  beforeEach(() => {
    cy.fixture("users").then((users) => {
      cy.wrap(users).as("users");
    });
  });

  afterEach(() => {
    cy.logout();
  });

  it("Test1: Valid login", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.verifyInventoryPage();
    cy.get(".shopping_cart_link").should("be.visible");
  });

  it("Test2: Invalid login (locked user)", function () {
    LoginPage.login(this.users.lockedUser.username, this.users.lockedUser.password);
    LoginPage.getError().should("be.visible").and("contain", "locked out");
    cy.url().should("include", "saucedemo");
  });

  it("Test3: Logout functionality", function () {
    cy.viewport(1280, 720); 
    cy.login(this.users.validUser.username, this.users.validUser.password);
  
    cy.get("#react-burger-menu-btn").should("be.visible").click();
  
    cy.get("#logout_sidebar_link", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.url().should("include", "/");
    cy.get('[data-test="login-button"]').should("be.visible");
  });
  

  it("Test4: Product page loads correctly", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.verifyInventoryPage();
    cy.get(".inventory_item").should("have.length", 6);
    cy.get(".inventory_item_name").each(($el) => {
      cy.wrap($el).should("be.visible");
    });
  });

  it("Test5: Item details page displays correct info", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.openItemDetails("Sauce Labs Backpack");
    ItemDetailPage.verifyDetails("Sauce Labs Backpack", "$29.99");
  });

  it("Test6: Remove an item from the cart", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.addItem("Sauce Labs Backpack");
    InventoryPage.removeItem("Sauce Labs Backpack");
    cy.get(".shopping_cart_badge").should("not.exist");
  });

  it("Test7: Checkout process step 1", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.addItem("Sauce Labs Backpack");
    InventoryPage.openCart();
    CartPage.clickCheckout();
    cy.url().should("include", "/checkout-step-one.html");
    cy.get('[data-test="firstName"]').should("be.visible");
  });

  it("Test8: Checkout process step 2", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.addItem("Sauce Labs Backpack");
    InventoryPage.openCart();
    CartPage.clickCheckout();
    CheckoutStepOnePage.fillInfo("Abdelrahman", "Farouk", "54321");
    CheckoutStepOnePage.clickContinue();
    cy.url().should("include", "/checkout-step-two.html");
    CheckoutStepTwoPage.verifySummaryVisible();
  });

  it("Test9: Cancel checkout goes back to cart", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.addItem("Sauce Labs Backpack");
    InventoryPage.openCart();
    CartPage.clickCheckout();
    CheckoutStepOnePage.fillInfo("Abdelrahman", "Farouk", "54321");
    CheckoutStepOnePage.clickCancel();
    cy.url().should("include", "/cart.html");
    cy.get(".cart_item").should("contain", "Sauce Labs Backpack");
  });

  it("Test10: Check page title and inventory header", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    cy.url().should("include", "/inventory.html");
    cy.title().should("eq", "Swag Labs");
    cy.get(".title").should("have.text", "Products");
    cy.get(".inventory_item").should("have.length", 6);
  });

  it("Test11: Invalid login (wrong password)", function () {
    LoginPage.login("standard_user", "wrong_password");
    LoginPage.getError().should("be.visible").and("contain", "do not match");
    cy.url().should("include", "saucedemo");
  });

  it("Test12: Add multiple items to the cart", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.addItem("Sauce Labs Backpack");
    InventoryPage.addItem("Sauce Labs Bike Light");
    cy.get(".shopping_cart_badge").should("contain", "2");
  });

  it("Test13: Open and close side menu", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
    InventoryPage.openSideMenu();
    cy.get(".bm-menu").should("be.visible");
    cy.get("#about_sidebar_link").should("exist");
    InventoryPage.closeSideMenu();
    cy.get(".bm-menu").should("not.be.visible");
  });

  it("Test14: Sorting products by Price (low to high)", function () {
    cy.login(this.users.validUser.username, this.users.validUser.password);
  
    cy.url().should("include", "/inventory.html");
  
    cy.get('[data-test="product-sort-container"]', { timeout: 15000 })  // <-- FIXED selector
      .should("exist")
      .should("be.visible")
      .select("lohi");
  
    cy.get(".inventory_item_price").then(($prices) => {
      const priceArray = [...$prices].map(el =>
        parseFloat(el.innerText.replace("$", ""))
      );
      const sorted = [...priceArray].sort((a, b) => a - b);
      expect(priceArray).to.deep.equal(sorted);
    });
  });
  

  it("Test15: Error message when logging in with no credentials", function () {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="login-button"]').click();
    LoginPage.getError().should("be.visible").and("contain", "Username is required");
    cy.url().should("include", "saucedemo");
  });
});
