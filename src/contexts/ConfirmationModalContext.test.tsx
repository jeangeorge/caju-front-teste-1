import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import {
  ConfirmationModalProvider,
  useConfirmationModal,
} from "./ConfirmationModalContext";

type TestComponentProps = {
  onConfirm: jest.Mock;
};

const TestComponent = ({ onConfirm }: TestComponentProps) => {
  const { message, open, openModal, closeModal } = useConfirmationModal();

  return (
    <div>
      <button onClick={() => openModal({ message: "Test Message", onConfirm })}>
        Open Modal
      </button>
      <button onClick={closeModal}>Close Modal</button>

      <div data-testid="message">{message}</div>
      <div data-testid="open-status">{open ? "Open" : "Closed"}</div>

      {open && <button onClick={onConfirm}>Confirm</button>}
    </div>
  );
};

describe("ConfirmationModalProvider", () => {
  it("provides default context values", () => {
    render(
      <ConfirmationModalProvider>
        <TestComponent onConfirm={jest.fn()} />
      </ConfirmationModalProvider>
    );

    expect(screen.getByTestId("message")).toHaveTextContent("");
    expect(screen.getByTestId("open-status")).toHaveTextContent("Closed");
  });

  it("updates context values when openModal is called", () => {
    render(
      <ConfirmationModalProvider>
        <TestComponent onConfirm={jest.fn()} />
      </ConfirmationModalProvider>
    );

    fireEvent.click(screen.getByText("Open Modal"));

    expect(screen.getByTestId("message")).toHaveTextContent("Test Message");
    expect(screen.getByTestId("open-status")).toHaveTextContent("Open");
  });

  it("resets context values when closeModal is called", () => {
    render(
      <ConfirmationModalProvider>
        <TestComponent onConfirm={jest.fn()} />
      </ConfirmationModalProvider>
    );

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Close Modal"));

    expect(screen.getByTestId("message")).toHaveTextContent("");
    expect(screen.getByTestId("open-status")).toHaveTextContent("Closed");
  });

  it("onConfirm is called correctly", async () => {
    const onConfirm = jest.fn();

    render(
      <ConfirmationModalProvider>
        <TestComponent onConfirm={onConfirm} />
      </ConfirmationModalProvider>
    );

    fireEvent.click(screen.getByText("Open Modal"));
    fireEvent.click(screen.getByText("Confirm"));

    expect(onConfirm).toHaveBeenCalled();
  });
});
