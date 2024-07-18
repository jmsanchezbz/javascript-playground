import { ex1, ex2 } from "./pec1";

describe("ex1", () => {
  test("should return true when value is less than 0", () => {
    expect(ex1(10)).toBe(false);
    expect(ex1(20)).toBe(false);
    expect(ex1(0)).toBe(false);
    expect(ex1(-2)).toBe(true);
    expect(ex1(-3)).toBe(true);
  });
});

describe("ex2", () => {
  test("should calculate the total value of the order line", () => {
    expect(ex2(2.0, 4)).toBe(8.0);
    expect(ex2(5.95, 3)).toBe(17.85);
    expect(ex2(10.0, 10)).toBe(100.0);
  });
});
