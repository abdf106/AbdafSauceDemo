class LoginPage {
    visit() {
      cy.visit("https://www.saucedemo.com/");
    }
  
    login(username, password) {
      this.visit();
      cy.get('[data-test="username"]').type(username);
      cy.get('[data-test="password"]').type(password);
      cy.get('[data-test="login-button"]').click();
    }
  
    getError() {
      return cy.get('[data-test="error"]');
    }
  }
  
  export default new LoginPage();
  