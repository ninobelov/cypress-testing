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
      expect(response.body).to.have.property('id'); // Ensure response body has id property
      expect(response.body).to.have.property('petId'); // Ensure response body has petId property
      expect(response.body).to.have.property('quantity'); // Ensure response body has quantity property
      expect(response.body).to.have.property('shipDate'); // Ensure response body has shipDate property
      expect(response.body).to.have.property('status'); // Ensure response body has status property
      expect(response.body).to.have.property('complete'); // Ensure response body has complete property
      expect(response.body.petId).to.eq(petOrder.petId); // Ensure the petId matches the petId in the original order
      expect(response.body.quantity).to.eq(petOrder.quantity); // Ensure the quantity matches the quantity in the original order
      expect(response.body.status).to.eq(petOrder.status); // Ensure the status matches the status in the original order
      expect(response.body.complete).to.eq(petOrder.complete); // Ensure the complete matches the complete in the original order
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
      expect(response.body).to.have.property('petId'); // Ensure the order data has petId property
      expect(response.body.petId).to.eq(petOrder.petId); // Ensure the petId matches the petId in the original order
      expect(response.body).to.have.property('quantity'); // Ensure the order data has quantity property
      expect(response.body.quantity).to.eq(petOrder.quantity); // Ensure the quantity matches the quantity in the original order
      expect(response.body).to.have.property('shipDate'); // Ensure the order data has shipDate property
      expect(response.body).to.have.property('status'); // Ensure the order data has status property
      expect(response.body.status).to.eq(petOrder.status); // Ensure the status matches the status in the original order
      expect(response.body).to.have.property('complete'); // Ensure the order data has complete property
      expect(response.body.complete).to.eq(petOrder.complete); // Ensure the complete matches the complete in the original order
    });
  });

  it('Delete the order for the pet - Obrisati porudzbinu za ljubimca', () => {
    cy.request({
      method: 'DELETE',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
    }).then(response => {
      expect(response.status).to.eq(200);
      // Ensure the response body contains the message that order is deleted
      expect(response.body.message).to.eq(`${orderId}`);
    });
  });

  it('Check whether the order has been deleted - Proveriti da li je porudzbina obrisana', () => {
    cy.request({
      method: 'GET',
      url: `https://petstore.swagger.io/v2/store/order/${orderId}`,
      failOnStatusCode: false, // This prevents Cypress from failing when it gets a 404
    }).then(response => {
      expect(response.status).to.eq(404);
      // Ensure the response body contains the message that order is not found
      expect(response.body.message).to.eq(`Order not found`);
    });
  });
});
