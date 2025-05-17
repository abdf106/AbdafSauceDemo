Feature: Cart

  Scenario: Add a single item to the cart
    Given I am logged in with valid credentials
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show 1

  Scenario: Add multiple items to the cart
    Given I am logged in with valid credentials
    When I add "Sauce Labs Backpack" and "Sauce Labs Bike Light" to the cart
    Then the cart badge should show 2
