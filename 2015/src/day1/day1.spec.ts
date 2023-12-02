import day1 from "./index";

describe("On Day 1", () => {
  describe("Part 1", () => {
    it("should return floor 0 for (()) and ()()", () => {
      expect(day1.solveForPartOne("(())")).toBe("0");
      expect(day1.solveForPartOne("()()")).toBe("0");
    });

    it("should return floor 3 for ((( and (()(()(", () => {
      expect(day1.solveForPartOne("(((")).toBe("3");
      expect(day1.solveForPartOne("(()(()(")).toBe("3");
    });

    it("should return floor 3 for ))(((((", () => {
      expect(day1.solveForPartOne("))(((((")).toBe("3");
    });

    it("should return floor -1 for ()) and ))(", () => {
      expect(day1.solveForPartOne("())")).toBe("-1");
      expect(day1.solveForPartOne("))(")).toBe("-1");
    });

    it("should return floor -3 for ))) and )())())", () => {
      expect(day1.solveForPartOne(")))")).toBe("-3");
      expect(day1.solveForPartOne(")())())")).toBe("-3");
    });
  });
});
describe("Part 2", () => {
  it("should return correct basement entry position", () => {
    expect(day1.solveForPartTwo(")")).toBe("1");
    expect(day1.solveForPartTwo("()())")).toBe("5");
  });
});
