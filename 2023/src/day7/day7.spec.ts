import day7 from "./index";

describe("On Day 7", () => {
  describe("Part 1", () => {
    it("should correctly calculate total winnings", () => {
      const input = `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`;
      const expectedOutput = "6440";
      expect(day7.solveForPartOne(input)).toBe(expectedOutput);
    });
  });
  describe("Part 2", () => {
    it("should correctly calculate total winnings with joker rule", () => {
      const input = `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`;
      const expectedOutput = "5905";
      expect(day7.solveForPartTwo(input)).toBe(expectedOutput);
    });
  });
});
