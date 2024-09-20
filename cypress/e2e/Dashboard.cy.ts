describe("Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("initial rendering", () => {
    cy.contains("header", "Caju Front Teste").should("exist");

    cy.get("input")
      .should("exist")
      .and("have.value", "")
      .and("have.attr", "placeholder", "Digite um CPF válido");

    cy.contains("button", "Nova Admissão").should("exist");
    cy.get('button[aria-label="refetch"]').should("exist");

    cy.contains("h3", "Pronto para revisar").should("exist");
    cy.contains("h3", "Aprovado").should("exist");
    cy.contains("h3", "Reprovado").should("exist");
  });

  it("refresh button action", () => {
    cy.get("input[placeholder='Digite um CPF válido']").type("11111111111");

    cy.get('button[aria-label="refetch"]').click();

    cy.contains(
      "p",
      "Tem certeza que deseja atualizar a listagem de admissões?"
    );

    cy.contains("button", "Não");
    cy.contains("button", "Sim").click();

    cy.contains("h3", "Pronto para revisar").should("exist");
    cy.contains("h3", "Aprovado").should("exist");
    cy.contains("h3", "Reprovado").should("exist");
    cy.get("input[value='111.111.111-11']").should("exist");
  });

  it("redirect to new user page", () => {
    cy.contains("button", "Nova Admissão").click();
    cy.url().should(
      "eq",
      "http://localhost:3001/caju-front-teste-1/#/new-user"
    );
  });

  it("confirmation modals", () => {
    cy.get('button[aria-label="refetch"]').click();
    cy.contains("h2", "Confirmação");
    cy.contains("button", "Não").click();

    cy.contains("button", "Reprovar").first().click();
    cy.contains("h2", "Confirmação");
    cy.contains("button", "Não").click();

    cy.contains("button", "Aprovar").first().click();
    cy.contains("h2", "Confirmação");
    cy.contains("button", "Não").click();

    cy.contains("button", "Revisar novamente").first().click();
    cy.contains("h2", "Confirmação");
    cy.contains("button", "Não").click();

    cy.get("svg[aria-label='delete']").first().click();
    cy.contains("h2", "Confirmação");
    cy.contains("button", "Não").click();
  });
});
