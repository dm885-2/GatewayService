/** 	Sample taken from CRUD test 		**/

// describe('READ Test', () => {

    /** Login before each test in the file: */
    // beforeEach(()=> {
    //     cy.loginAsUser();
    //     cy.getAT();
    // });

    /** CREATE FILE TEST */
    // it("CREATE test", () => {
    //     cy.request({
    //         method: "POST",
    //         url: "/files",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + Cypress.env("token")
    //         },
    //         body: {
    //             filename: "testFile.mzn",
    //             filetype: "mzn",
    //             data : "fuk of ya buggar"
    //         }
    //     }).then(response => {
    //         expect(response.status).to.eq(200);
    //         expect(response.body.error).to.eq(false);
    //         expect(response.body.filename).to.eq('testFile.mzn');
    //         expect(response.body.filetype).to.eq('mzn');
    //     })
    // })

    /** DELETE ALL FILES AFTER EACH TEST */
    // afterEach(() => {
    //     cy.request({
    //         method: "GET",
    //         url: "/files/all/mzn",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + Cypress.env("token")
    //         }
    //     }).then(res => {
    //         res.body.results.forEach(file => {
    //             cy.request({
    //                 method: "DELETE",
    //                 url: "/files/"+file.fileId,
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": "Bearer " + Cypress.env("token")
    //                 }
    //             })
    //             return;
    //         });
    //     })
    // })
//});
