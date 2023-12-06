import day6 from "./index";

describe("On Day 6", () => {
  describe("Part 1", () => {
    it("should calculate the total number of ways to win the races", () => {
      const input = "Time:      7 15 30\nDistance:  9 40 200";
      expect(day6.solveForPartOne(input)).toBe("288");
    });
  });
  describe("Part 2", () => {
    it(`part1 is identity function`, () => {});
  });
});
