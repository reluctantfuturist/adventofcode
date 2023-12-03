import day5 from "./index";

describe("On Day 5", () => {
  describe("Part 1", () => {
    it(`should correctly identify nice strings`, () => {
      expect(day5.solveForPartOne("ugknbfddgicrmopn")).toBe("1");
      expect(day5.solveForPartOne("aaa")).toBe("1");
      expect(day5.solveForPartOne("jchzalrnumimnmhp")).toBe("0");
      expect(day5.solveForPartOne("haegwjzuvuyypxyu")).toBe("0");
      expect(day5.solveForPartOne("dvszwmarrgswjxmb")).toBe("0");
    });
  });
  describe("Part 2", () => {
    expect(day5.solveForPartTwo("qjhvhtzxzqqjkmpb")).toBe("1");
    expect(day5.solveForPartTwo("xxyxx")).toBe("1");
    expect(day5.solveForPartTwo("uurcxstgmygtbstg")).toBe("0");
    expect(day5.solveForPartTwo("ieodomkazucvgmuy")).toBe("0");
  });
});
