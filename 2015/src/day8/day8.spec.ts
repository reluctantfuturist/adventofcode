import day8 from "./index";

describe("On Day 8", () => {
  describe("Part 1", () => {
    it("calculates the difference between code and memory characters correctly", () => {
      const testCases = [
        { input: '""', expected: "2" },
        { input: '"abc"', expected: "2" },
        { input: '"aaa\\"aaa"', expected: "3" },
        { input: '"\\x27"', expected: "5" },
      ];

      for (const { input, expected } of testCases) {
        expect(day8.solveForPartOne(input)).toBe(expected);
      }
    });
  });
  describe("Part 2", () => {
    it("calculates the difference between original and encoded characters correctly", () => {
      const input = `""\n"abc"\n"aaa\\"aaa"\n"\\x27"`;
      const result = day8.solveForPartTwo(input);
      expect(day8.solveForPartTwo(input)).toBe("19");
    });
  });
});
