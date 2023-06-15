/// <reference types="cypress" />

import { visitWebsite } from '../../support/utils';
import { computerName } from '../../support/constants';

describe('Computer database - Computer Details And Deletion Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

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
});
