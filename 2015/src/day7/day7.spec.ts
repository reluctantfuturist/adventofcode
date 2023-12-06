import day7 from "./index";

describe("On Day 7", () => {
  describe("Part 1", () => {
    it("should correctly calculate signals", () => {
      const circuit = `
        123 -> x
        456 -> y
        x AND y -> d
        x OR y -> e
        x LSHIFT 2 -> f
        y RSHIFT 2 -> g
        NOT x -> h
        NOT y -> i
      `;
      expect(day7.solveForPartOne(circuit, "d")).toBe("72");
      expect(day7.solveForPartOne(circuit, "e")).toBe("507");
      expect(day7.solveForPartOne(circuit, "f")).toBe("492");
      expect(day7.solveForPartOne(circuit, "g")).toBe("114");
      expect(day7.solveForPartOne(circuit, "h")).toBe("65412");
      expect(day7.solveForPartOne(circuit, "i")).toBe("65079");
      expect(day7.solveForPartOne(circuit, "x")).toBe("123");
      expect(day7.solveForPartOne(circuit, "y")).toBe("456");

      // Add more assertions for 'd', 'e', 'f', 'g', 'h', 'i' if they are implemented in solveForPartOne or solveForPartTwo
    });
  });
});
describe("Part 2", () => {});
