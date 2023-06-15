import { getRandomString, getRandomNumber } from '../../support/utils';
const BASE_URL = 'http://localhost:3000/comments/';
let body = '';
let postId = 0;
let commentId = '';

describe('API testing - comments', () => {
  beforeEach(() => {
    body = getRandomString(8);
    postId = getRandomNumber();
  });

  it('Get all comments', () => {
    cy.request('GET', BASE_URL).then(response => {
      expect(response.status).to.equal(200);
    });
  });

  it('Create a comment', () => {
    cy.request('POST', BASE_URL, {
      body: {
        body: body,
        postId: postId,
      },
    }).then(response => {
      expect(response.status).to.equal(201);
      expect(response.body.body.body).to.equal(body);
      expect(response.body.body.postId).to.equal(postId);

      commentId = response.body.id;
    });
  });

  it('Update a comment', () => {
    cy.request('PUT', `${BASE_URL}${commentId}`, {
      body: {
        body: body,
        postId: postId,
      },
    }).then(response => {
      expect(response.status).to.equal(200);
      expect(response.body.body.body).to.equal(body);
      expect(response.body.body.postId).to.equal(postId);
    });
  });

  it('Delete a comment', () => {
    cy.request({ method: 'DELETE', url: `${BASE_URL}${commentId}` }).then(
      response => {
        expect(response.status).to.equal(200);

        cy.request({
          method: 'GET',
          url: `${BASE_URL}${commentId}`,
          failOnStatusCode: false, // prevents from failing when the GET request returns a 4xx/5xx response
        }).then(getResponse => {
          expect(getResponse.status).to.equal(404);
        });
      },
    );
  });
});
