import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Button from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("handle click event correctly", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click event when disabled", () => {
    const onClick = jest.fn();
    render(
      <Button disabled onClick={onClick}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(onClick).not.toHaveBeenCalled();
    expect(buttonElement).toBeDisabled();
  });

  it("additional HTML attributes", () => {
    render(
      <Button data-testid="button" aria-label="button">
        Click Me
      </Button>
    );
    const buttonElement = screen.getByTestId("button");
    expect(buttonElement).toHaveAttribute("aria-label", "button");
  });
});
