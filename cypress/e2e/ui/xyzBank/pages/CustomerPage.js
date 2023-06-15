export default class CustomerPage {
  makeDeposit(amount) {
    cy.get('[ng-class="btnClass2"]').click();
    cy.get('input[ng-model="amount"]').type(amount);
    cy.get('form[name="myForm"] > .btn.btn-default').click();
  }

  getBalance() {
    return cy.get('.borderM > :nth-child(3) > :nth-child(2)');
  }

  withdrawAmount(amount) {
    cy.get('[ng-class="btnClass3"]').click();
    cy.get('.form-control').as('inputField').clear();
    cy.get('@inputField').type(amount);
    cy.get('form[name="myForm"] > .btn.btn-default').click().wait(1000);
  }

  loginCustomer() {
    cy.get('#userSelect').select(3);
    cy.get('form.ng-valid > .btn').click();
    cy.url().should(
      'include',
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/account',
    );
  }

  logout() {
    cy.get('.logout').wait(1000).click();
  }
}
