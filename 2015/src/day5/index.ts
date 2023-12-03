import { Day } from "@lib/day";

class Day5 extends Day {
  constructor() {
    super(5, 2015);
  }

  private isNiceString(str: string): boolean {
    const hasThreeVowels = (str.match(/[aeiou]/g) || []).length >= 3;
    const hasDoubleLetter = /([a-z])\1/.test(str);
    const hasNoDisallowedStrings = !/ab|cd|pq|xy/.test(str);

    return hasThreeVowels && hasDoubleLetter && hasNoDisallowedStrings;
  }

  private isNiceStringTwo(str: string): boolean {
    // Rule 1: Contains a pair of any two letters that appears at least twice without overlapping
    const hasPair = /([a-z][a-z]).*\1/.test(str);

    // Rule 2: Contains at least one letter which repeats with exactly one letter between them
    const hasRepeat = /([a-z])[a-z]\1/.test(str);

    return hasPair && hasRepeat;
  }

  solveForPartOne(input: string): string {
    const strings = input.split("\n");
    const niceStringCount = strings.filter(this.isNiceString).length;
    return niceStringCount.toString();
  }

  solveForPartTwo(input: string): string {
    const strings = input.split("\n");
    const niceStringCount = strings.filter(this.isNiceStringTwo).length;
    return niceStringCount.toString();
  }
}

export default new Day5();
