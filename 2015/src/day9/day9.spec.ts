import day9 from "./index";

describe("On Day 9", () => {
  describe("Part 1", () => {
    it("should calculate the shortest tour correctly", () => {
      const input = `London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141`;
      const shortestTour = day9.solveForPartOne(input);
      expect(shortestTour).toBe("605");
    });
  });
  describe("Part 2", () => {
    it("should calculate the longest tour correctly", () => {
      const input = `London to Dublin = 464\nLondon to Belfast = 518\nDublin to Belfast = 141`;
      const longestTour = day9.solveForPartTwo(input);
      expect(longestTour).toBe("982");
    });
  });
});
