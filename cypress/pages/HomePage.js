export default class HomePage {
  visit() {
    cy.visit('/'); // visiting the home page
  }

  verifyPageTitle() {
    cy.title().should('eq', 'Computers database'); // verifying that the page title is correctly displayed
  }

  verifyMainElements() {
    cy.get('header a').should('be.visible');
    cy.get('#add').should('be.visible');
    cy.get('#searchbox').should('be.visible');
    cy.get('#searchsubmit').should('be.visible');
    cy.get('#pagination').should('be.visible');
    cy.contains('Next →').should('be.visible');
    cy.contains('← Previous').should('be.visible');
  }

  verifyTableColumnHeaders() {
    cy.contains('Computer name').should('be.visible');
    cy.contains('Introduced').should('be.visible');
    cy.contains('Discontinued').should('be.visible');
    cy.contains('Company').should('be.visible');
  }

  sortTableByColumn(columnName) {
    cy.contains(columnName).click(); // Sort the table by the specified column name
  }

  enterSearch(query) {
    cy.get('#searchbox').type(query); // entering a search query in the search bar
    cy.get('#searchsubmit').click(); // submitting the search
  }

  verifySearchResults() {
    cy.get('.computers.zebra-striped tbody tr').should(
      'have.length.greaterThan',
      0,
    ); // verifying the visibility of search results
  }

  searchComputer(name) {
    this.enterSearch(name); // searching for a specific computer
  }

  verifySearchResult(name) {
    cy.get('.computers.zebra-striped tbody tr')
      .contains(name) // searched computer exists in the table
      .should('exist');
  }

  verifyNoSearchResults() {
    cy.get('.well').should('contain', 'Nothing to display');
  }

  addNewComputer() {
    cy.get('a.btn-success').click();
  }

  openComputerDetail(index) {
    cy.get('.computers.zebra-striped tbody tr').eq(index).find('td a').click();
  }

  navigateToNextPage() {
    cy.contains('Next →').click();
  }

  navigateToPreviousPage() {
    cy.contains('← Previous').click();
  }

  verifyPageUrl(pageNumber) {
    cy.url().should('include', `/computers?p=${pageNumber}`);
  }

  verifyPreviousButtonDisabled() {
    cy.get('#pagination li.prev').should('have.class', 'disabled');
  }

  enterSearchQuery(searchQuery) {
    cy.get('#searchbox').type(searchQuery);
  }

  clickSearchButton() {
    cy.get('#searchsubmit').click();
  }

  verifySearchResultsVisible() {
    cy.get('tbody > tr > :nth-child(1) > a').should('be.visible');
  }

  verifySearchedComputerExists(computerName) {
    cy.contains('td', computerName).should('exist');
  }

  verifyNoResultsMessageDisplayed() {
    cy.get('em').should('contain', 'Nothing to display');
  }
}
