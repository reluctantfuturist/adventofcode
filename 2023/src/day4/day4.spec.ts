import day4 from "./index";

describe("On Day 4", () => {
  describe("Part 1", () => {
    it(`calculates the correct points for each card`, () => {
      const input = `41 48 83 86 17 | 83 86  6 31 17  9 48 53
                     13 32 20 16 61 | 61 30 68 82 17 32 24 19
                      1 21 53 59 44 | 69 82 63 72 16 21 14  1
                     41 92 73 84 69 | 59 84 76 51 58  5 54 83
                     87 83 26 28 32 | 88 30 70 12 93 22 82 36
                     31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
      expect(day4.solveForPartOne(input)).toBe("13");
    });
  });
  describe("Part 2", () => {
    it(`calculates the correct total number of cards`, () => {
      const input = `41 48 83 86 17 | 83 86  6 31 17  9 48 53
                     13 32 20 16 61 | 61 30 68 82 17 32 24 19
                      1 21 53 59 44 | 69 82 63 72 16 21 14  1
                     41 92 73 84 69 | 59 84 76 51 58  5 54 83
                     87 83 26 28 32 | 88 30 70 12 93 22 82 36
                     31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
      expect(day4.solveForPartTwo(input)).toBe("30");
    });
  });
});
