import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import Dashboard from "./Dashboard";
import { ConfirmationModalProvider } from "~/contexts";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

const server = setupServer(
  http.get("http://localhost:3000/registrations", () => {
    return HttpResponse.json(
      [
        {
          id: "1",
          admissionDate: "22/10/2023",
          email: "filipe@caju.com.br",
          employeeName: "Filipe Marins",
          status: "REVIEW",
          cpf: "78502270001",
        },
        {
          id: "2",
          admissionDate: "22/10/2023",
          email: "jose@caju.com.br",
          employeeName: "José Leão",
          status: "REPROVED",
          cpf: "78502270001",
        },
        {
          id: "3",
          admissionDate: "22/10/2023",
          email: "luiz@caju.com.br",
          employeeName: "Luiz Filho",
          status: "APPROVED",
          cpf: "56642105087",
        },
      ],
      { status: 200 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

beforeEach(() => {
  render(
    <ConfirmationModalProvider>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </ConfirmationModalProvider>
  );
});

describe("Dashboard", () => {
  it("initial render", () => {
    expect(
      screen.getByPlaceholderText("Digite um CPF válido")
    ).toBeInTheDocument();
    expect(screen.getByText("Nova Admissão")).toBeInTheDocument();
    expect(screen.getByLabelText("refetch")).toBeInTheDocument();
    expect(screen.getByText("Nova Admissão")).toBeInTheDocument();
  });

  it("render fetched data correctly", async () => {
    expect(await screen.findByText("Pronto para revisar")).toBeInTheDocument();
    expect(await screen.findByText("Aprovado")).toBeInTheDocument();
    expect(await screen.findByText("Reprovado")).toBeInTheDocument();
    expect(await screen.findByText("Filipe Marins")).toBeInTheDocument();
    expect(await screen.findByText("Luiz Filho")).toBeInTheDocument();
    expect(await screen.findByText("José Leão")).toBeInTheDocument();
  });
});
