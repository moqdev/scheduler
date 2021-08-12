describe("Navigation", () => {
  beforeEach(() => {
    window.cy.visit("http://localhost:8000/");
  });

  it("should navigate to Tuesday", () => {
    window.cy
      .contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});