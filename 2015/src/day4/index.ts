import { Day } from "@lib/day";
import { MD5 } from "crypto-js";

class Day4 extends Day {
  constructor() {
    super(4, 2015);
  }

  private mineAdventCoin(secretKey: string, leadingZeroes: string): number {
    let number = 0;
    while (true) {
      const hash = MD5(secretKey + number.toString()).toString();
      if (hash.startsWith(leadingZeroes)) {
        return number;
      }
      number++;
    }
  }

  solveForPartOne(input: string): string {
    const number = this.mineAdventCoin(input, "00000");
    return number.toString();
  }

  solveForPartTwo(input: string): string {
    const number = this.mineAdventCoin(input, "000000");
    return number.toString();
  }
}

export default new Day4();
