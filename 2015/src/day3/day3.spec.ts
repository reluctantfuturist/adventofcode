import day3 from "./index";

describe("On Day 3", () => {
  describe("Part 1", () => {
    it("delivers presents to 2 houses: one at the starting location, and one to the east", () => {
      expect(day3.solveForPartOne(">")).toBe("2");
    });

    it("delivers presents to 4 houses in a square, including twice to the house at his starting/ending location", () => {
      expect(day3.solveForPartOne("^>v<")).toBe("4");
    });

    it("delivers a bunch of presents to some very lucky children at only 2 houses", () => {
      expect(day3.solveForPartOne("^v^v^v^v^v")).toBe("2");
    });
  });
  describe("Part 2", () => {
    it("delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south", () => {
      expect(day3.solveForPartTwo("^v")).toBe("3");
    });

    it("delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started", () => {
      expect(day3.solveForPartTwo("^>v<")).toBe("3");
    });

    it("delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other", () => {
      expect(day3.solveForPartTwo("^v^v^v^v^v")).toBe("11");
    });
  });
});
