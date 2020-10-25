import { checkForLocation } from "../src/client/js/locationChecker";

describe("Testing placename input checker functionality", () => {
  test("Testing valid input", () => {
    expect(checkForLocation("California")).toBeTruthy();
  });
  test("Testing invalid input", () => {
    expect(checkForLocation("")).toBeFalsy();
  });
});
