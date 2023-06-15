/// <reference types="cypress" />

import { visitWebsite } from '../../support/utils';

describe('Computer database - Navigation And Redirects Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

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
});
