describe("appointment", () => {
  beforeEach(() => {
    window.cy.request("GET", "http://localhost:8001/api/debug/reset");
    window.cy.visit("http://localhost:8000/");
  });

  it("should book an interview", () => {
    //1: visit the page and click on the add img
    window.cy.get("[alt=Add]").first().click();
    //2: Enter a student name
    window.cy
      .get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    //3: Select an interviewer
    window.cy.get("[alt='Sylvia Palmer']").click();
    //4: Click on save
    window.cy.contains("Save").click();

    window.cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    window.cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  it("should edit an interview", () => {
    //visit the page and click on the edit icon
    // window.cy.get("[data-testid=appointment]");
    window.cy.get("[alt=Edit]").first().click({ force: true });
    //2: Delete and then enter a student name
    window.cy
      .get("[data-testid=student-name-input]")
      .clear()
      .type("Sayantan Basu");
    // //3: Select a different interviewer
    window.cy.get("[alt='Tori Malcolm']").click();
    // //4: Click on save
    window.cy.contains("Save").click();

    window.cy.contains(".appointment__card--show", "Sayantan Basu");
    window.cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    window.cy.get("[alt=Delete]").click({ force: true });

    window.cy.contains("Confirm").click();

    window.cy.contains("Deleting").should("exist");
    window.cy.contains("Deleting").should("not.exist");

    window.cy
      .contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
});