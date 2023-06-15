/// <reference types="cypress" />

import { visitWebsite } from '../../support/utils';

describe('Computer database - Page Display Tests', () => {
  beforeEach(() => {
    visitWebsite();
  });

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
});
