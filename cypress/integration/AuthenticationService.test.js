describe('AuthenticationService', () => {

  beforeEach(() => {
    Cypress.env('loginU', 'test');
    Cypress.env('loginP', 'test');
  });

  it('Can create a user', () => {
    cy.request('POST', '/auth/register', {
      'username': Cypress.env('loginU'),
      'password': Cypress.env('loginP'),
      'passwordRepeat': Cypress.env('loginP')
    })
      .then((response) => {
        expect(response.body).to.have.property('error', false)
        return response;
      })
      .its('status').should('eq', 200);
  });

  it('Can login with new credentials', () => {
    cy.request('POST', '/auth/login', {
      'username': Cypress.env('loginU'),
      'password': Cypress.env('loginP')
    }).then((response) => {
      expect(response.body).to.have.property('error', false);
      Cypress.env('rtoken', response.body.refreshToken);
    }).its('status').should('eq', 200);
  });

});
