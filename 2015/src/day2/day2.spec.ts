import day2 from "./index";

describe("On Day 2", () => {
  describe("Part 1", () => {
    it("calculates the correct amount of wrapping paper for 2x3x4", () => {
      expect(day2.solveForPartOne("2x3x4")).toBe("58");
    });

    it("calculates the correct amount of wrapping paper for 1x1x10", () => {
      expect(day2.solveForPartOne("1x1x10")).toBe("43");
    });
  }),
    describe("Part 1", () => {
      it("calculates the correct amount of ribbon for 2x3x4", () => {
        expect(day2.solveForPartTwo("2x3x4")).toBe("34");
      });

      it("calculates the correct amount of wrapping paper for 1x1x10", () => {
        expect(day2.solveForPartTwo("1x1x10")).toBe("14");
      });
    });
});
