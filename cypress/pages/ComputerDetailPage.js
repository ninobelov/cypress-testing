import { computerName } from '../support/constants';

export default class ComputerDetailPage {
  navigateToComputerDetail() {
    cy.xpath('(//tbody/tr/td/a)[1]').click();
    cy.url().should('include', '/computers/');
  }

  deleteComputer() {
    cy.get('tbody > :nth-child(1) > :nth-child(1) > a').click();
    cy.get('.topRight > .btn').click({ force: true });
    cy.get('.alert-message').contains(
      'Computer ' + computerName + ' has been deleted',
    );
  }
}
