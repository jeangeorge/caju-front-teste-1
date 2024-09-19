import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import IconButton from "./IconButton";

describe("IconButton", () => {
  it("renders children correctly", () => {
    render(<IconButton>Click Me</IconButton>);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  it("handle click event correctly", () => {
    const onClick = jest.fn();
    render(<IconButton onClick={onClick}>Click Me</IconButton>);

    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not trigger click event when disabled", () => {
    const onClick = jest.fn();

    render(
      <IconButton disabled onClick={onClick}>
        Click Me
      </IconButton>
    );

    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);

    expect(onClick).not.toHaveBeenCalled();
    expect(buttonElement).toBeDisabled();
  });

  it("additional HTML attributes", () => {
    render(
      <IconButton data-testid="icon-button" aria-label="icon-button">
        Click Me
      </IconButton>
    );
    const buttonElement = screen.getByTestId("icon-button");
    expect(buttonElement).toHaveAttribute("aria-label", "icon-button");
  });
});
