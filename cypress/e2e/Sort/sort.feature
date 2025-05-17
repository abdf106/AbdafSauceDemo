Feature: Sort products on inventory page

  Scenario: Sort products from Z to A
    Given I am logged in with valid credentials
    When I sort products from Z to A
    Then the products should be sorted by name in descending order

  Scenario: Sort products by price low to high
    Given I am logged in with valid credentials
    When I sort products by price low to high
    Then the products should be sorted by price in ascending order

  Scenario: Sort products by price high to low
    Given I am logged in with valid credentials
    When I sort products by price high to low
    Then the products should be sorted by price in descending order
