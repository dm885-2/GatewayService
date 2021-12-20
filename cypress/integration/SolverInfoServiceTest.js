describe('SolverInfoService as Admin', () => {

  beforeEach(() => {
    cy.loginAsAdmin();
    cy.getAT();

    cy.getAllSolvers();
    cy.deleteAllSolvers();
  });

  it('should return list with created solver when getting solvers after solver was added.', () => {
    // First create a solver that we can later update.
    cy.request({
      method: 'POST',
      url: '/solvers',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      },
      body: {
        name: 'foo',
        docker_image: 'bar'
      }
    }).then(() => {

      // Now test if the created solver is returned.
      cy.request({
        method: 'GET',
        url: '/solvers',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cypress.env('token')
        },
      }).then(response => {
        expect(response.status).to.eq(200);
        expect(response.body.data.length).to.eq(1);
        expect(response.body.data[0].name).to.eq('foo');
        expect(response.body.data[0].docker_image).to.eq('bar');
      });
    });
  });
});


describe('SolverInfoService as User', () => {

  before(() => {
    cy.loginAsUser();
    cy.getAT();
  });

  it('should be able to list the solvers.', () => {
    cy.request({
      method: 'GET',
      url: '/solvers',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      },
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });

  it('should return 403 Forbidden when adding a solver.', () => {
    cy.request({
      method: 'POST',
      url: '/solvers',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      },
      body: {
        name: 'foo',
        docker_image: 'bar'
      }
    }).then(response => {
      expect(response.status).to.eq(403);
    });
  });
});


describe('SolverInfoService as Guest', () => {

  beforeEach(() => {
    // No user is created as we run the endpoints as non-authenticated guest.
  });

  it('should return 401 Unauthorized when listing the solvers.', () => {
    cy.request({
      method: 'GET',
      url: '/solvers',
      failOnStatusCode: false,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      expect(response.status).to.eq(401);
    });
  });
});
