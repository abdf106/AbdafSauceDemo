Feature: Logout Functionality

  Scenario: Successful logout from the application
    Given I am logged in with valid credentials
    When I click on the logout button
    Then I should be redirected to the login page
