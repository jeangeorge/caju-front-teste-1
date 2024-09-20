import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import NewUserPage from "./NewUser";

const mockPush = jest.fn();

jest.mock("react-router-dom", () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

const server = setupServer(
  http.post("http://localhost:3000/registrations", ({ request }) => {
    return HttpResponse.json(request.json(), { status: 201 });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

beforeEach(() => {
  render(
    <QueryClientProvider client={queryClient}>
      <NewUserPage />
    </QueryClientProvider>
  );
});

describe("NewUser", () => {
  it("initial rendering", () => {
    expect(screen.getByLabelText("back")).toBeInTheDocument();
    expect(screen.getByLabelText("Nome")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("CPF")).toBeInTheDocument();
    expect(screen.getByLabelText("Data de admissão")).toBeInTheDocument();
    expect(screen.getByText("Cadastrar")).toBeInTheDocument();
  });

  it("empty form validation", async () => {
    await act(async () => {
      screen.getByText("Cadastrar").click();
    });
    expect(screen.getByText("Insira um nome!")).toBeInTheDocument();
    expect(screen.getByText("Insira um email!")).toBeInTheDocument();
    expect(screen.getByText("Insira um CPF!")).toBeInTheDocument();
    expect(
      screen.getByText("Insira uma data de admissão!")
    ).toBeInTheDocument();
  });

  it("name validation", async () => {
    const inputName = screen.getByLabelText<HTMLInputElement>("Nome");

    fireEvent.change(inputName, {
      target: { value: "1" },
    });
    await act(async () => {
      screen.getByText("Cadastrar").click();
    });
    expect(
      screen.getByText("O nome deve conter pelo menos um espaço!")
    ).toBeInTheDocument();

    fireEvent.change(inputName, {
      target: { value: "1 " },
    });
    await act(async () => {
      screen.getByText("Cadastrar").click();
    });
    expect(
      screen.getByText("A primeira letra do nome não pode ser um número!")
    ).toBeInTheDocument();
  });

  it("email validation", async () => {
    const inputEmail = screen.getByLabelText<HTMLInputElement>("Email");

    fireEvent.change(inputEmail, {
      target: { value: "teste@t" },
    });
    await act(async () => {
      screen.getByText("Cadastrar").click();
    });
    expect(screen.getByText("Insira um email válido!")).toBeInTheDocument();
  });

  it("cpf validation", async () => {
    const cpfEmail = screen.getByLabelText<HTMLInputElement>("CPF");

    fireEvent.change(cpfEmail, {
      target: { value: "11111111111" },
    });
    await act(async () => {
      screen.getByText("Cadastrar").click();
    });
    expect(screen.getByText("Insira um CPF válido!")).toBeInTheDocument();
  });

  it("create registration with success", async () => {
    const inputName = screen.getByLabelText<HTMLInputElement>("Nome");
    const inputEmail = screen.getByLabelText<HTMLInputElement>("Email");
    const inputCpf = screen.getByLabelText<HTMLInputElement>("CPF");
    const inputAdmissionDate =
      screen.getByLabelText<HTMLInputElement>("Data de admissão");

    fireEvent.change(inputName, {
      target: { value: "Test Test" },
    });

    fireEvent.change(inputEmail, {
      target: { value: "test@test.com" },
    });

    fireEvent.change(inputCpf, {
      target: { value: "33590539070" },
    });

    fireEvent.change(inputAdmissionDate, {
      target: { value: "2022-09-20" },
    });

    fireEvent.click(screen.getByText("Cadastrar"));

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith("/dashboard"));
  });
});
