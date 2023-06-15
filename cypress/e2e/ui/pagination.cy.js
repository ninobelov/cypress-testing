/// <reference types="cypress" />

import { visitWebsite } from '../../support/utils';

describe('Computer database - Pagination Navigation Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

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
});
