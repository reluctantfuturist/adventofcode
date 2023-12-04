import day6 from "./index";

describe("On Day 6", () => {
  describe("Part 1", () => {
    it("should correctly handle light instructions", () => {
      const instructions = [
        "turn on 0,0 through 999,999",
        "toggle 0,0 through 999,0",
        "turn off 499,499 through 500,500",
      ].join("\n");

      // After "turn on", all 1,000,000 lights are on
      // After "toggle", the first 1,000 lights are off, so 999,000 lights are on
      // After "turn off", 4 lights are off, so 998,996 lights are on
      expect(day6.solveForPartOne(instructions)).toBe("998996");
    });
  });
  describe("Part 2", () => {
    it("should correctly handle light instructions", () => {
      expect(day6.solveForPartTwo("turn on 0,0 through 0,0")).toBe("1");
      expect(day6.solveForPartTwo("toggle 0,0 through 999,999")).toBe(
        "2000000"
      );
    });
  });
});
