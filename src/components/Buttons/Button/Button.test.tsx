import { render, screen } from "@testing-library/react";

import Button from "./Button";

describe("Button", () => {
  it("Should show button", () => {
    render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i }));
  });
});
