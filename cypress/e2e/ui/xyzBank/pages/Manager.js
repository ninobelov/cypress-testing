export default class ManagerPage {
  addCustomer(customerName, lastName, postCode, addCustomerAlertText) {
    cy.get('[ng-class="btnClass1"]').click();
    cy.get('input[ng-model="fName"]').type(customerName);
    cy.get('input[ng-model="lName"]').type(lastName);
    cy.get('input[ng-model="postCd"]').type(postCode);
    cy.get('form[name="myForm"] > .btn.btn-default').click();

    cy.on('window:alert', str => {
      expect(str).to.equal(addCustomerAlertText);
    });
  }

  openAccount(userOption, currencyOption, openAccountAlertText) {
    cy.get('[ng-class="btnClass2"]').click().wait(1000);
    cy.get('#userSelect').select(userOption);
    cy.get('#currency').select(currencyOption);
    cy.get('form.ng-dirty > button').click();

    cy.on('window:alert', str => {
      expect(str).to.equal(openAccountAlertText);
    });
  }
}
