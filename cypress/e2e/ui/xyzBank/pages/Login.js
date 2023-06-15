export default class LoginPage {
  visit() {
    cy.visit(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login',
    );
  }

  bankManagerLogin() {
    cy.get(':nth-child(3) > .btn').click();
  }

  customerLogin() {
    cy.get('.borderM > :nth-child(1) > .btn').click();
  }
}
