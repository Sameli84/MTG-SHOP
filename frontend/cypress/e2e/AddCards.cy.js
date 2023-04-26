describe("Adding cards and finding them", () => {
  it("should be able to add card when logged in", () => {
    cy.login("jarvinensampsa@gmail.com", "mullijuu");
    cy.url().should("be.equal", `${Cypress.config("baseUrl")}/`);

    cy.contains("ADD CARD").click();
    cy.get("[data-cy=cardNameInput]").click().type("Dark Rit{enter}");
    cy.get("[data-cy=cardPriceInput]").type("8");
    cy.get("[data-cy=cardSubmit]").click();
    cy.visit("/");
  });

  it("should be able to find cards after adding them", () => {
    cy.visit("/");
    cy.get("[data-cy=cardNameSearch]").type("Dark Ritual");
    cy.get("[data-cy=cardTitle]").should('contain', 'Dark Ritual');
    cy.get("[data-cy=cardText]").should('contain', 'NM - 8 €');
  });
});
