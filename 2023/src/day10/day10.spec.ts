import day10 from "./index";

describe("On Day 10", () => {
  describe("Part 1", () => {
    it("calculates the farthest distance correctly for the square loop", () => {
      const input = `
.....
.S-7.
.|.|.
.L-J.
.....
`;
      expect(day10.solveForPartOne(input.trim())).toBe("4");
    });

    it("calculates the farthest distance correctly for the complex loop", () => {
      const input = `
..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`;
      expect(day10.solveForPartOne(input.trim())).toBe("8");
    });
  });
  describe("Part 2", () => {
    it("calculates the number of enclosed tiles correctly for the given loop", () => {
      const input = `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`;
      expect(day10.solveForPartTwo(input.trim())).toBe("4");
    });
    it("calculates the number of enclosed tiles correctly for the given loop", () => {
      const input = `
..........
.S------7.
.|F----7|.
.||....||.
.||....||.
.|L-7F-J|.
.|..||..|.
.L--JL--J.
..........
`;
      expect(day10.solveForPartTwo(input.trim())).toBe("4");
    });
  });
});
