describe("The front page", () => {
  it("should open the Signup/login view when clicking Authenticate", () => {
    cy.visit("/");
    cy.contains("Dropdown").click();
    cy.contains("AUTHENTICATE").click();
    cy.url().should("include", "auth");
    cy.contains("SignUp instead?").click();
    cy.get("button").should("not.contain", "SignUp instead?");
    cy.contains("Login instead?").click();
    cy.get("button").should("not.contain", "Login instead?");
  });
});
