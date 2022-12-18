describe("login", () => {
  it("should fail login", () => {
    cy.visit("http://localhost:4200");
    cy.get("input[name=username]").type("99");
    cy.get("input[name=password]").type("pass");
    cy.get("button[type=submit]").click();
    cy.get("div").contains("Incorrect username");
  });
  it("should login", () => {
    cy.visit("http://localhost:4200/");
    cy.get("input[name=username]").type("1");
    cy.get("input[name=password]").type("password");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/users");
  });
});
