import { getRandomString } from '../../support/utils';
const BASE_URL = 'http://localhost:3000/posts/';
let title = '';
let author = '';
let postId = 0;

describe('API testing - posts', () => {
  beforeEach(() => {
    title = getRandomString(8);
    author = getRandomString(8);
  });
  it('Get all posts', () => {
    cy.request({
      method: 'GET',
      url: BASE_URL,
    }).then(response => {
      expect(response.status).equal(200);
    });
  });

  it('Create a post', () => {
    cy.request({
      method: 'POST',
      url: BASE_URL,
      body: {
        title: title,
        author: author,
      },
    }).then(response => {
      expect(response.status).equal(201);
      expect(response.body.title).equal(title);
      expect(response.body.author).equal(author);
      cy.log(JSON.stringify(response.body.id));

      postId = response.body.id;
    });
  });

  it('Update a post', () => {
    cy.request({
      method: 'PUT',
      url: `${BASE_URL}${postId}`,
      body: {
        title: title,
        author: author,
      },
    }).then(response => {
      expect(response.status).equal(200);
      expect(response.body.title).equal(title);
      expect(response.body.author).equal(author);
    });
  });
  it('Delete a post', () => {
    cy.request({ method: 'DELETE', url: `${BASE_URL}${postId}` }).then(
      response => {
        expect(response.status).to.equal(200);

        cy.request({
          method: 'GET',
          url: `${BASE_URL}${postId}`,
          failOnStatusCode: false, // prevents from failing when the GET request returns a 4xx/5xx response
        }).then(getResponse => {
          expect(getResponse.status).to.equal(404);
        });
      },
    );
  });
});
