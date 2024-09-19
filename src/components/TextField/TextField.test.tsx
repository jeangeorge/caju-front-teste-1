import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import TextField from "./TextField";

describe("TextField", () => {
  it("renders the input correctly", () => {
    render(<TextField id="test-input" />);
    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("id", "test-input");
  });

  it("renders the label correctly", () => {
    render(<TextField label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("displays an error message when provided", () => {
    render(<TextField error="This field is required" id="test-input" />);
    const errorMessage = screen.getByText("This field is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveStyle("font-size: 12px");
    expect(errorMessage).toHaveStyle("color: red");
  });
});
