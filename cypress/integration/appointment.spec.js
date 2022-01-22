/*
Instead of writing one big test, let's start by writing three smaller tests.

"should book an interview"
"should edit an interview"
"should cancel an interview"

*/

describe("Appointments", () => {
    beforeEach(() => {
     cy.request("GET", "/api/debug/reset");
   
     cy.visit("/");
   
     cy.contains("Monday");
    });


/*  Booking Appointment Test

The plan for testing the booking of an interview is more manageable.

Visits the root of our web server
Clicks on the "Add" button in the second appointment
Enters their name
Chooses an interviewer
Clicks the save button
Sees the booked appointment

*/

    it("should book an interview", () => {
        cy.get("[alt=Add]")
        .first()
        .click();
    
        cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
        cy.get('[alt="Sylvia Palmer"]').click();
    
        cy.contains("Save").click();
    
        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Sylvia Palmer");
    });

/* Editing Appointment Test

If we edit the existing appointment booked for "Archie Cohen", then we don't need to create an appointment first.

Visits the root of our web server
Clicks the edit button for the existing appointment
Changes the name and interviewer
Clicks the save button
Sees the edit to the appointment

*/
    it("should edit an interview", () =>{
        cy.get("[alt=Edit]").first().click({force: true});
        cy.get('[alt="Tori Malcolm"]').click();
        cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
        cy.contains("Save").click();
        cy.contains(".appointment__card--show", "Lydia Miller-Jones");
        cy.contains(".appointment__card--show", "Tori Malcolm");
    });

/* Canceling
We can also perform a test to cancel an existing interview. It is for this reason that we need to reset the database after each test. If one test cancels and interview and the next test expects that interview to exist, then our tests can break for reasons unrelated to our code quality.

Visits the root of our web server
Clicks the delete button for the existing appointment
Clicks the confirm button
Sees that the appointment slot is empty

*/


});