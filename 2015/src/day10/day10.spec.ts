import day10 from "./index";

describe("On Day 10", () => {
  describe("Part 1", () => {
    it(`transforms sequences correctly`, () => {
      expect(day10.solveForPartOne("1", 1)).toBe("2");
      expect(day10.solveForPartOne("11", 1)).toBe("2");
      expect(day10.solveForPartOne("21", 1)).toBe("4");
      expect(day10.solveForPartOne("1211", 1)).toBe("6");
      expect(day10.solveForPartOne("111221", 1)).toBe("6");
    });
  });
  describe("Part 2", () => {
    it(`part1 is identity function`, () => {});
  });
});
