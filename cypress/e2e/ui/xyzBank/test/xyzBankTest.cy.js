import LoginPage from '../pages/Login';
import ManagerPage from '../pages/Manager';
import CustomerPage from '../pages/CustomerPage';

import {
  firstName,
  lastName,
  postCode,
  userOption,
  currencyOption,
  openAccountAlertText,
  addCustomerAlertText,
  depositAmount,
  withdrawAmount,
  expectedAmount,
} from '../../../../support/constants';

const login = new LoginPage();
const manager = new ManagerPage();
const customer = new CustomerPage();

describe('Banking App Test', () => {
  beforeEach(() => {
    login.visit();
  });

  it('Create a new account - Napraviti novi account', () => {
    login.bankManagerLogin();
    manager.addCustomer(firstName, lastName, postCode, addCustomerAlertText);
  });

  it('Open an account - Otvoriti racun', () => {
    login.bankManagerLogin();
    manager.openAccount(userOption, currencyOption, openAccountAlertText);
  });

  it('Log in as a customer - Logovati se', () => {
    login.customerLogin();
    customer.loginCustomer();
  });

  it('Make a deposit - Napraviti deposit', () => {
    login.customerLogin();
    customer.loginCustomer();
    customer.makeDeposit(depositAmount);
  });

  it('Check balance - Proveriti koliki je balans', () => {
    login.customerLogin();
    customer.loginCustomer();
    customer.makeDeposit(depositAmount);
    customer.getBalance().should('contain', depositAmount);
  });

  it('Withdraw certain amount and check the new balance - Povuci odredjenu sumu i proveriti novi balans', () => {
    login.customerLogin();
    customer.loginCustomer();
    customer.makeDeposit(depositAmount);
    customer.withdrawAmount(withdrawAmount);
    customer.getBalance().should('contain', expectedAmount);
  });

  it('Log out', () => {
    login.customerLogin();
    customer.loginCustomer();
    customer.logout();
  });
});
