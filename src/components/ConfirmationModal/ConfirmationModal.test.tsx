import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { useConfirmationModal } from "~/contexts";

import ConfirmationModal from "./ConfirmationModal";

jest.mock("~/contexts", () => ({
  useConfirmationModal: jest.fn(),
}));

const mockedUseConfirmationModal = useConfirmationModal as jest.Mock;

describe("ConfirmationModal", () => {
  beforeEach(() => {
    mockedUseConfirmationModal.mockReset();
  });

  it("does not render when open is false", () => {
    mockedUseConfirmationModal.mockReturnValue({
      message: "Tem certeza?",
      onConfirm: jest.fn(),
      open: false,
      closeModal: jest.fn(),
    });

    render(<ConfirmationModal />);
    expect(screen.queryByText("Confirmação")).not.toBeInTheDocument();
  });

  it("renders correctly when open is true", () => {
    mockedUseConfirmationModal.mockReturnValue({
      message: "Tem certeza?",
      onConfirm: jest.fn(),
      open: true,
      closeModal: jest.fn(),
    });

    render(<ConfirmationModal />);
    expect(screen.getByText("Confirmação")).toBeInTheDocument();
    expect(screen.getByText("Tem certeza?")).toBeInTheDocument();
    expect(screen.getByText("Sim")).toBeInTheDocument();
    expect(screen.getByText("Não")).toBeInTheDocument();
  });

  it("calls onConfirm and closeModal when confirm button is clicked", () => {
    const onConfirmMock = jest.fn();
    const closeModalMock = jest.fn();

    mockedUseConfirmationModal.mockReturnValue({
      message: "Tem certeza?",
      onConfirm: onConfirmMock,
      open: true,
      closeModal: closeModalMock,
    });

    render(<ConfirmationModal />);

    fireEvent.click(screen.getByText("Sim"));

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });

  it("calls closeModal when cancel button is clicked", () => {
    const closeModalMock = jest.fn();

    mockedUseConfirmationModal.mockReturnValue({
      message: "Tem certeza?",
      onConfirm: jest.fn(),
      open: true,
      closeModal: closeModalMock,
    });

    render(<ConfirmationModal />);

    fireEvent.click(screen.getByText("Não"));

    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });
});
