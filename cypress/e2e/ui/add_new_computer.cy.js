/// <reference types="cypress" />

import { formatToDateString, visitWebsite } from '../../support/utils';
import { nameOfComputer } from '../../support/constants';

describe('Computer database - Computer Creation Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

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
});
