import { checkForDate } from "../src/client/js/dateChecker";

describe("Testing date input checker functionality", () => {
  test("Testing valid input", () => {
    expect(checkForDate("2020-10-10")).toBeTruthy();
  });
  test("Testing invalid input", () => {
    expect(checkForDate("")).toBeFalsy();
  });
});
