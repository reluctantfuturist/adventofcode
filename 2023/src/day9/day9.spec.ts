import day9 from "./index";

describe("On Day 9", () => {
  describe("Part 1", () => {
    it("should correctly predict the next value for each sequence and sum them", () => {
      const input = "0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45";
      expect(day9.solveForPartOne(input)).toBe("114");
    });
  });
  describe("Part 2", () => {
    it("should correctly predict the previous value for each sequence and sum them", () => {
      const input = "0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45";
      expect(day9.solveForPartTwo(input)).toBe("2");
    });
  });
});
