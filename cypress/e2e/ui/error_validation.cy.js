/// <reference types="cypress" />

import { visitWebsite } from '../../support/utils';
import { invalidDate } from '../../support/constants';

describe('Computer database - Form Validation Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

  it('should validate when adding a computer without filling in details', () => {
    // Click on the 'Add a new computer' button
    cy.get('#add').click();

    cy.get('.btn.primary').click();

    // Verify that the error message is displayed for required fields
    cy.get('.error > .input > .help-inline').should('be.visible');
  });

  it('should display an error message when editing a computer with invalid date format', () => {
    cy.xpath('(//tbody/tr/td/a)[1]').click();

    // Clear the 'Introduced' field and enter an invalid date
    cy.get('#introduced').clear().type(invalidDate);
    cy.get('.btn.primary').click();

    // Verify that the error message is displayed for the invalid date format
    cy.get('.error > .input > .help-inline').should('be.visible');
  });
});
