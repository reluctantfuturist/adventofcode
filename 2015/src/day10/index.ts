import { Day } from "@lib/day";

class Day10 extends Day {
  constructor() {
    super(10, 2015);
  }

  private parseSequence(sequence: string): string {
    let result = "";
    let buffer = "";
    let count = 0;

    for (let i = 0; i < sequence.length; i++) {
      if (buffer === "" || buffer === sequence[i]) {
        buffer = sequence[i];
        count++;
      } else {
        result += count.toString() + buffer;
        buffer = sequence[i];
        count = 1;
      }
    }

    // Handle the final group
    if (buffer !== "") {
      result += count.toString() + buffer;
    }

    return result;
  }

  private max_runs = 40;

  solveForPartOne(input: string, max_runs: number = this.max_runs): string {
    for (let i = 0; i < max_runs; i++) {
      input = this.parseSequence(input);
    }
    return input.length.toString();
  }

  solveForPartTwo(
    input: string,
    max_runs: number = this.max_runs + 10
  ): string {
    for (let i = 0; i < max_runs; i++) {
      input = this.parseSequence(input);
    }
    return input.length.toString();
  }
}

export default new Day10();
