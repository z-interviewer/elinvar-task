Feature: Checking 'Add Asset' page functionality


############ move to add asseet sset feature file 

Background:
    Given I navigate to Add Asset tab

Scenario: Submit correct asset
    When I input correct asset
    And I click on add asset button
    Then I received message that asset added successfully
    And I click on close button and close pop-up

  Scenario: Submit existing asset
    When I input correct asset
    And I click on add asset button
    Then I received message that asset is already exist
    And I click on close button and close pop-up

############ this should be moved to existing asset feature file
Background:
    Given I navigate to Existing Assets tab
  
  Scenario: Searching existing asset
    When I input asset value into search
    Then I see searched result in table

  Scenario: Sorting asset
    Given I navigate to Existing Assets tab
    When I input sort parameter into search field
    Then I see sorted result in table

  Scenario: Checking displaying count of assets in the table
    Given I navigate to Existing Assets tab
    When I select from Show entries to display '100' assets in the table
    Then I see 100 asset in the table

  Scenario: Checking Pagination of assets in the table
    Given I navigate to Existing Assets tab
    When I click on navigate to next step button
    Then I see results from next page

  Scenario: Sorting assets
    Given I navigate to Existing Assets tab
    When I click on sorting icon in the table
    Then I see asset sorted in ascending order in the table
