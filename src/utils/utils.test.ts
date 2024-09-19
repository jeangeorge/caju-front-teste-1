import { formatCpf, isValidCpf } from "./utils";

describe("formatCpf", () => {
  it("formats CPF correctly", () => {
    expect(formatCpf("99999999999")).toBe("999.999.999-99");
  });
});

describe("isValidCpf", () => {
  it("validate that an CPF is invalid", () => {
    expect(isValidCpf("88888888888")).toBeFalsy();
  });

  it("validate that an CPF is valid", () => {
    expect(isValidCpf("68038905032")).toBeTruthy();
  });
});
