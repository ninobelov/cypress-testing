import { petOrder } from '../../../../support/constants';
describe('Pet Store Test', () => {
  let orderId;

  it('Create an order for one pet - Kreirati porudzbinu za jednog ljubimca', () => {
    cy.request({
      method: 'POST',
      url: 'https://petstore.swagger.io/v2/store/order',
      body: petOrder,
    }).then(response => {
      expect(response.status).to.eq(200);
      orderId = response.body.id;
    });
  });

  it('Check whether the order has been saved - Proveriti da li je porudzbina sacuvana', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eq(orderId); // Check that the order ID matches
    });
  });

  it('Delete the order for the pet - Obrisati porudzbinu za ljubimca', () => {
    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('Check whether the order has been deleted - Proveriti da li je porudzbina obrisana', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
      failOnStatusCode: false, // This prevents Cypress from failing when it gets a 404
    }).then(response => {
      expect(response.status).to.eq(404);
    });
  });
});
