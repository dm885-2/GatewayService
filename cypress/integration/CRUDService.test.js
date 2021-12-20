describe('CRUDService CREATE', () => {

  beforeEach(() => {
    cy.loginAsUser();
    cy.getAT();
  });

  it('CREATE test', () => {
    cy.request({
      method: 'POST',
      url: '/files',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      },
      body: {
        filename: 'testFile.mzn',
        filetype: 'mzn',
        data: 'fuk of ya buggar'
      }
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.error).to.eq(false);
      expect(response.body.filename).to.eq('testFile.mzn');
      expect(response.body.filetype).to.eq('mzn');
    })
  })

  afterEach(() => {
    cy.request({
      method: 'GET',
      url: '/files/all/mzn',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      }
    }).then(res => {
      res.body.results.forEach(file => {
        cy.request({
          method: 'DELETE',
          url: '/files/' + file.fileId,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cypress.env('token')
          }
        });
      });
    })
  })
});


describe('CRUDService READ ALL', () => {

  //Creates a user before spec file is run.
  before(() => {
    cy.loginAsUser();
    cy.getAT();
    for (var i = 0; i < 5; i++)
      cy.addFile(i + 'test.mzn');
  })

  it('READ ALL TEST', () => {
    cy.request({
      method: 'GET',
      url: '/files/all/mzn',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      }
    }).then((response) => {
      expect(response).to.have.property('status', 200);
      expect(response.body).to.have.property('error', false);
      expect(response.body.results.length).to.eq(5);
    });
  });

  //Delete all files after each test
  after(() => {
    cy.request({
      method: 'GET',
      url: '/files/all/mzn',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cypress.env('token')
      }
    }).then(res => {
      res.body.results.forEach(file => {
        cy.request({
          method: 'DELETE',
          url: '/files/' + file.fileId,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cypress.env('token')
          }
        });
      });
    })
  })
});
