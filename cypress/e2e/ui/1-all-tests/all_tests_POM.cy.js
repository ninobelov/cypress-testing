/// <reference types="cypress" />

import HomePage from '../../../pages/HomePage';
import AddNewComputerPage from '../../../pages/AddNewComputerPage';
import ComputerDetailPage from '../../../pages/ComputerDetailPage';
import {
  nameOfComputer,
  introduced,
  discontinued,
  company,
  computerNameTest,
  searchQuery,
  invalidDate,
} from '../../../support/constants';

// Initialize the page objects
const homePage = new HomePage();
const addNewComputerPage = new AddNewComputerPage();
const computerDetailPage = new ComputerDetailPage();

describe('Computer database - testing', () => {
  beforeEach(() => {
    homePage.visit();
  });

  it('should display the correct page title', () => {
    homePage.verifyPageTitle();
  });

  it('should display the main elements', () => {
    homePage.verifyMainElements();
  });

  it('should display table column headers', () => {
    homePage.verifyTableColumnHeaders();
  });

  it('should sort the table', () => {
    homePage.sortTableByColumn('Computer name');
    homePage.sortTableByColumn('Introduced');
    homePage.sortTableByColumn('Discontinued');
    homePage.sortTableByColumn('Company');
  });

  /* Section: Pagination Navigation */
  it('should navigate through pagination', () => {
    for (let i = 1; i <= 3; i++) {
      homePage.navigateToNextPage();
      homePage.verifyPageUrl(i);
    }

    for (let i = 2; i >= 0; i--) {
      homePage.navigateToPreviousPage();
      homePage.verifyPageUrl(i);
    }
  });

  it('should be disabled on the first page of pagination', () => {
    homePage.verifyPreviousButtonDisabled();
  });

  /* Section: Computer Creation */
  it("should display the 'Add a new computer' page", () => {
    addNewComputerPage.addNewComputer();
    addNewComputerPage.verifyAddComputerPage();
  });

  it('should add a new computer', () => {
    addNewComputerPage.addNewComputer();
    addNewComputerPage.fillNewComputerForm(
      nameOfComputer,
      introduced,
      discontinued,
      company,
    );
    addNewComputerPage.createNewComputer();
    addNewComputerPage.verifySuccessMessage(nameOfComputer);
  });

  /* Section: Navigation and Redirects */

  it('should navigate to the homepage when clicking on the name of the website (logo)', () => {
    addNewComputerPage.navigateToHomePage();
  });

  it("should return to the home page when cancel button is clicked in 'Add a new computer' form", () => {
    addNewComputerPage.cancelAddNewComputerForm();
  });

  /* Section: Search Functionality */

  it('should filter by name using the search bar', () => {
    homePage.enterSearchQuery(nameOfComputer);
    homePage.clickSearchButton();
    homePage.verifySearchResultsVisible();
  });

  it('should search for a specific computer', () => {
    homePage.enterSearchQuery(computerNameTest);
    homePage.clickSearchButton();
    homePage.verifySearchedComputerExists(computerNameTest);
  });

  it("should display 'Nothing to display' when search has no results", () => {
    homePage.enterSearchQuery(searchQuery);
    homePage.clickSearchButton();
    homePage.verifyNoResultsMessageDisplayed();
  });

  /* Section: Computer Details and Deletion */

  it('should navigate to a computer detail page', () => {
    computerDetailPage.navigateToComputerDetail();
  });

  it('should delete a computer using the delete button', () => {
    computerDetailPage.deleteComputer();
  });

  /* Section: Form Validation */

  it('should display an error message when editing a computer with invalid date format', () => {
    addNewComputerPage.editComputerWithInvalidDateFormat(invalidDate);
  });
});
