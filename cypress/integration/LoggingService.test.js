describe('LoggingService as Admin', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.getAT();
  });

  it('Admin will get logs', () => {
    cy.request({
      method: 'GET',
      url: '/logs',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      }
    }).then(res => {
      expect(res).to.have.property('status', 200);
    });
  });
});


describe('LoggingService as User', () => {

  beforeEach(() => {
    cy.loginAsUser();
    cy.getAT();
  })

  it('User will not logs', () => {
    cy.request({
      method: 'get',
      url: '/logs',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      }
    }).then(res => {
      expect(res).to.have.property('status', 403);
    });
  });
});


describe('LoggingService as Guest', () => {

  it('Should not get any logs', () => {
    cy.request({
      method: 'get',
      url: '/logs',
      failOnStatusCode: false,

    }).then(res => {
      expect(res).to.have.property('status', 401);
    });
  });
});
