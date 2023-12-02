import { Day } from "@lib/day";

class Day1 extends Day {
  constructor() {
    super(1, 2015);
  }

  private findSantaFloor(instructions: string): number {
    let floor = 0;

    for (const char of instructions) {
      if (char === "(") {
        floor++;
      } else if (char === ")") {
        floor--;
      }
    }

    return floor;
  }

  private findBasementEntryPosition(instructions: string): number {
    let floor = 0;

    for (let i = 0; i < instructions.length; i++) {
      floor += instructions[i] === "(" ? 1 : -1;

      if (floor === -1) {
        return i + 1; // Adding 1 because positions are 1-indexed
      }
    }

    return -1; // Return -1 if basement is never reached
  }

  solveForPartOne(input: string): string {
    return this.findSantaFloor(input).toString();
  }

  solveForPartTwo(input: string): string {
    return this.findBasementEntryPosition(input).toString();
  }
}

export default new Day1();
