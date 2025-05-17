Feature: User Login

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter a valid username and password
    Then I should be redirected to the inventory page

  Scenario: Unsuccessful login with invalid credentials
    Given I am on the login page
    When I enter an invalid username or password
    Then I should see an error message
