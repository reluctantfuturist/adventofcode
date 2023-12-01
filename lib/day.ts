import fs from "fs";

abstract class Day {
  id: number;
  year: number;

  constructor(id: number, year: number) {
    this.id = id;
    this.year = year;
  }

  async partOne(): Promise<string> {
    const content = await fs.promises.readFile(
      `./${this.year}/inputs/day${this.id}/part1.txt`
    );
    const result = this.solveForPartOne(content.toString());
    return result;
  }

  abstract solveForPartOne(input: string): string;

  async partTwo(): Promise<string> {
    const content = await fs.promises.readFile(
      `./${this.year}/inputs/day${this.id}/part2.txt`
    );
    const result = this.solveForPartTwo(content.toString());
    return result;
  }

  abstract solveForPartTwo(input: string): string;
}

export { Day };
