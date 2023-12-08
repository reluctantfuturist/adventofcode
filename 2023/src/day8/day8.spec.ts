import day8 from "./index";

describe("On Day 8", () => {
  describe("Part 1", () => {
    it("should reach ZZZ in 2 steps", () => {
      const input = `RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)`;
      expect(day8.solveForPartOne(input)).toBe("2");
    });
    it("should reach ZZZ in 6 steps", () => {
      const input = `LLR\n\nAAA = (BBB, BBB)\nBBB = (AAA, ZZZ)\nZZZ = (ZZZ, ZZZ)`;
      expect(day8.solveForPartOne(input)).toBe("6");
    });
  });
  describe("Part 2", () => {
    it("should reach nodes ending with Z in 6 steps", () => {
      const input = `LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)`;
      expect(day8.solveForPartTwo(input)).toBe("6");
    });
  });
});
