import day3 from "./index";

describe("On Day 3", () => {
  describe("Part 1", () => {
    it("should correctly solve for part one", () => {
      const input = `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
      `.trim();

      const result = day3.solveForPartOne(input);
      expect(result).toBe("4361");
    });
  });
  describe("Part 2", () => {
    it("should correctly solve for part two", () => {
      const input = `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
      `.trim();

      const result = day3.solveForPartTwo(input);
      expect(result).toBe("467835");
    });
  });
});
