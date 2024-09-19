describe("NewUser", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/#/new-user");
  });

  it("initial loading", () => {
    cy.get('button[aria-label="back"]').should("exist");
    cy.get('input[name="employeeName"]').should("exist");
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="cpf"]').should("exist");
    cy.get('input[name="admissionDate"]').should("exist");
    cy.get('button[type="submit"]').should("exist");
  });

  it("empty form validation", () => {
    cy.get('button[type="submit"]').click();
    cy.contains("span", "Insira um nome!").should("exist");
    cy.contains("span", "Insira um email!").should("exist");
    cy.contains("span", "Insira um CPF!").should("exist");
    cy.contains("span", "Insira uma data de admissão!").should("exist");
  });

  it("name validation", () => {
    cy.get('input[name="employeeName"]').type("1");
    cy.get('button[type="submit"]').click();
    cy.contains("span", "O nome deve conter pelo menos um espaço!").should(
      "exist"
    );

    cy.get('input[name="employeeName"]').clear().type("1 ");
    cy.get('button[type="submit"]').click();
    cy.contains(
      "span",
      "A primeira letra do nome não pode ser um número!"
    ).should("exist");
  });

  it("email validation", () => {
    cy.get('input[name="email"]').type("test@t");
    cy.get('button[type="submit"]').click();
    cy.contains("span", "Insira um email válido!").should("exist");
  });

  it("cpf validation", () => {
    cy.get('input[name="cpf"]').type("11111111111");
    cy.get('button[type="submit"]').click();
    cy.contains("span", "Insira um CPF válido!").should("exist");
  });

  it("create registration with success", () => {
    cy.get('input[name="employeeName"]').type("E2E Test");
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="cpf"]').type("91543097006");
    cy.get('input[name="admissionDate"]').type("2024-10-10");
    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3001/#/dashboard");

    cy.get("div[role='alert']")
      .should("exist")
      .contains("div", "Registro criado com sucesso!");
  });
});
