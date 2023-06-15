export default class AddNewComputerPage {
  addNewComputer() {
    cy.get('#add').click();
  }

  verifyAddComputerPage() {
    cy.url().should('include', '/computers/new');
  }

  fillNewComputerForm(name, introduced, discontinued, company) {
    cy.get('#name').type(name);
    cy.get('#introduced').type(introduced);
    cy.get('#discontinued').type(discontinued);
    cy.get('#company').select(company);
    cy.get('.btn.primary').should('be.visible');
  }

  createNewComputer() {
    cy.get('.primary').click();
  }

  verifySuccessMessage(name) {
    cy.get('.alert-message').should('be.visible');
    cy.contains(`Computer ${name} has been created`).should('be.visible');
  }

  navigateToHomePage() {
    cy.get('#add').click();
    cy.get('h1.fill > .fill').click();
    cy.url().should('eq', 'https://computer-database.gatling.io/computers');
  }

  cancelAddNewComputerForm() {
    cy.get('#add').click();
    cy.url().should('include', '/computers/new');
    cy.get('.btn').contains('Cancel').click();
    cy.url().should('eq', 'https://computer-database.gatling.io/computers');
  }

  editComputerWithInvalidDateFormat(invalidDate) {
    cy.xpath('(//tbody/tr/td/a)[1]').click();
    cy.get('#introduced').clear().type(invalidDate);
    cy.get('.btn.primary').click();
    cy.get('.error > .input > .help-inline').should('be.visible');
  }
}
