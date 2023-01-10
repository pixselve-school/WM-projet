describe("login", () => {
  it("should fail login", () => {
    cy.visit("http://localhost:4200");
    cy.get("input[name=username]").type("randomemail@oui.oui");
    cy.get("input[name=password]").type("pass");
    cy.get("button[type=submit]").click();
    cy.get("div").contains("Incorrect email");
  });
  it("should login", () => {
    cy.visit("http://localhost:4200/");
    cy.get("input[name=username]").type("admin@administration.fr");
    cy.get("input[name=password]").type("admin");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/users");
  });
});
