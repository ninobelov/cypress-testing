/// <reference types="cypress" />
import { formatToDateString, visitWebsite } from '../../../support/utils';
import {
  nameOfComputer,
  computerName,
  searchQuery,
  invalidDate,
  computerNameTest,
} from '../../../support/constants';

describe('Computer database - testing', () => {
  beforeEach(() => {
    visitWebsite();
  });

  /* Section: Page and Elements Display */

  it('should display the correct page title', () => {
    // Verify that the page title is correctly displayed

    cy.title().should('eq', 'Computers database');
  });

  it('should display the main elements', () => {
    // Check if the main elements of the webpage are visible

    cy.get('header a').should('be.visible');
    cy.get('#add').should('be.visible');
    cy.get('#searchbox').should('be.visible');
    cy.get('#searchsubmit').should('be.visible');
    cy.get('#pagination').should('be.visible');
    cy.contains('Next →').should('be.visible');
    cy.contains('← Previous').should('be.visible');
  });

  it('should display table column headers', () => {
    // Verify that the column headers of the table are displayed correctly

    cy.contains('Computer name').should('be.visible');
    cy.contains('Introduced').should('be.visible');
    cy.contains('Discontinued').should('be.visible');
    cy.contains('Company').should('be.visible');
  });

  it('should sort the table', () => {
    // Sort the table by different columns
    cy.contains('Computer name').click();
    cy.contains('Introduced').click();
    cy.contains('Discontinued').click();
    cy.contains('Company').click();
  });

  /* Section: Pagination Navigation */

  it('should navigate through pagination', () => {
    // Click on the 'Next →' button and check if the next page is loaded
    for (let i = 1; i <= 3; i++) {
      cy.contains('Next →').click();
      cy.url().should('include', `/computers?p=${i}`);
    }

    // Click on the '← Previous' button and check if the previous page is loaded
    for (let i = 2; i >= 0; i--) {
      cy.contains('← Previous').click();
      cy.url().should('include', `/computers?p=${i}`);
    }
  });

  it('should be disabled on the first page of pagination', () => {
    // Verify that the previous button is disabled on the first page of pagination

    cy.get('#pagination li.prev').should('have.class', 'disabled');
  });

  /* Section: Computer Creation */

  it("should display the 'Add a new computer' page", () => {
    // Click on the 'Add a new computer' button
    cy.get('#add').click();

    // Verify that the URL includes '/computers/new'
    cy.url().should('include', '/computers/new');

    // Check if the required elements for adding a new computer are visible
    cy.get('#name').should('be.visible');
    cy.get('#introduced').should('be.visible');
    cy.get('#discontinued').should('be.visible');
    cy.get('#company').should('be.visible');
    cy.get('.btn.primary').should('be.visible');
  });

  it('should add a new computer', () => {
    // Generate random dates for introduced and discontinued fields
    const randomDate = formatToDateString(new Date(2012, 10, 11));
    const randomDateForDiscontinued = formatToDateString(new Date(2020, 8, 10));

    // Click on 'Add a new computer' button
    cy.get('#add').click();
    cy.get('#name').type(nameOfComputer);
    cy.get('#introduced').type(randomDate);
    cy.get('#discontinued').type(randomDateForDiscontinued);

    // Select a company from the dropdown
    cy.get('#company').select(3);

    // Click on 'Create this computer' button
    cy.get('.primary').click();

    // Verify success message for computer creation
    cy.get('.alert-message').contains(
      'Computer ' + nameOfComputer + ' has been created',
    );
  });

  /* Section: Navigation and Redirects */

  it('should navigate to the homepage when clicking on the name of the website (logo)', () => {
    cy.get('#add').click();

    // Click on the name of the website (logo) to navigate to the homepage
    cy.get('h1.fill > .fill').click();

    // Verify that the URL is the homepage URL
    cy.url().should('eq', 'https://computer-database.gatling.io/computers');
  });

  it("should return to the home page when cancel button is clicked in 'Add a new computer' form", () => {
    cy.get('#add').click();
    cy.url().should('include', '/computers/new');

    // Click on the cancel button in the 'Add a new computer' form
    cy.get('.btn').contains('Cancel').click();

    // Verify that the URL is the homepage URL
    cy.url().should('eq', 'https://computer-database.gatling.io/computers');
  });

  /* Section: Search Functionality */

  it('should filter by name using the search bar', () => {
    // Enter search query in the search bar
    cy.get('#searchbox').type('MacBook');

    // Click on search button
    cy.get('#searchsubmit').click();

    // Verify visibility of search results
    cy.get('tbody > tr > :nth-child(1) > a').should('be.visible');
  });

  it('should search for a specific computer', () => {
    // Enter the computer name to search for in the search box
    cy.get('#searchbox').type(computerNameTest);

    // Click on the 'Filter by name' button to perform the search
    cy.contains('Filter by name').click();

    // Verify that the searched computer exists in the table
    cy.contains('td', computerNameTest).should('exist');
  });

  it("should display 'Nothing to display' when search has no results", () => {
    // Enter the search query that does not match any computer
    cy.get('#searchbox').type(searchQuery);
    cy.get('#searchsubmit').click();

    // Verify that the 'Nothing to display' message is shown
    cy.get('em').should('contain', 'Nothing to display');
  });

  /* Section: Computer Details and Deletion */

  it('should navigate to a computer detail page', () => {
    // Click on the first computer's link in the table to view its details
    cy.xpath('(//tbody/tr/td/a)[1]').click();

    // Verify that the URL includes '/computers/'
    cy.url().should('include', '/computers/');
  });

  it('should delete a computer using the delete button', () => {
    // Click on the delete button for the first computer in the table
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();

    cy.get('.topRight > .btn').click({ force: true });

    // Verify success message for computer deletion
    cy.get('.alert-message').contains(
      'Computer ' + computerName + ' has been deleted',
    );
  });

  /* Section: Form Validation */

  it('should display an error message when editing a computer with invalid date format', () => {
    cy.xpath('(//tbody/tr/td/a)[1]').click();

    // Clear the 'Introduced' field and enter an invalid date
    cy.get('#introduced').clear().type(invalidDate);
    cy.get('.btn.primary').click();

    // Verify that the error message is displayed for the invalid date format
    cy.get('.error > .input > .help-inline').should('be.visible');
  });
});
