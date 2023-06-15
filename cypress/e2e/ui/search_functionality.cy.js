/// <reference types="cypress" />

import { visitWebsite } from '../../support/utils';
import { computerNameTest, searchQuery } from '../../support/constants';

describe('Computer database - Search Functionality Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

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
});
