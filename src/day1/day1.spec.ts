import day1 from "./index";

describe("On Day 1", () => {
  describe("Part 1", () => {
    it("should return correct calibration values", () => {
      expect(day1.solveForPartOne("1abc2")).toBe("12");
      expect(day1.solveForPartOne("pqr3stu8vwx")).toBe("38");
      expect(day1.solveForPartOne("a1b2c3d4e5f")).toBe("15");
      expect(day1.solveForPartOne("treb7uchet")).toBe("77");
    });

    it("should return correct sum of calibration values", () => {
      const input = "1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet";
      expect(day1.solveForPartOne(input)).toBe("142");
    });
  });

  describe("Part 2", () => {
    it("should return correct calibration values", () => {
      expect(day1.solveForPartTwo("two1nine")).toBe("29");
      expect(day1.solveForPartTwo("eightwothree")).toBe("83");
      expect(day1.solveForPartTwo("abcone2threexyz")).toBe("13");
      expect(day1.solveForPartTwo("xtwone3four")).toBe("24");
      expect(day1.solveForPartTwo("4nineeightseven2")).toBe("42");
      expect(day1.solveForPartTwo("zoneight234")).toBe("14");
      expect(day1.solveForPartTwo("7pqrstsixteen")).toBe("76");
    });

    it("should return correct sum of calibration values", () => {
      const input =
        "two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen";
      expect(day1.solveForPartTwo(input)).toBe("281");
    });
  });
});
