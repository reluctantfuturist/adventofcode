import { Day } from "@lib/day";

class Day8 extends Day {
  constructor() {
    super(8, 2015);
  }

  private processString(line: string): {
    codeCount: number;
    memoryCount: number;
  } {
    let memoryCount = 0;
    let i = 1; // Start after the initial quote

    while (i < line.length - 1) {
      // Stop before the final quote
      if (line[i] === "\\") {
        if (line[i + 1] === "x") {
          i += 4; // Skip hexadecimal escape sequence
        } else {
          i += 2; // Skip escaped character
        }
      } else {
        i++;
      }
      memoryCount++;
    }

    return { codeCount: line.length, memoryCount };
  }

  private encodeString(line: string): string {
    let encodedString = '"';
    for (const char of line) {
      if (char === "\\") {
        encodedString += "\\\\";
      } else if (char === '"') {
        encodedString += '\\"';
      } else {
        encodedString += char;
      }
    }
    return encodedString + '"';
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    let totalCodeCount = 0;
    let totalMemoryCount = 0;

    for (const line of lines) {
      const { codeCount, memoryCount } = this.processString(line);
      totalCodeCount += codeCount;
      totalMemoryCount += memoryCount;
    }

    const difference = totalCodeCount - totalMemoryCount;
    return difference.toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    let totalOriginalLength = 0;
    let totalEncodedLength = 0;

    for (const line of lines) {
      totalOriginalLength += line.length;
      totalEncodedLength += this.encodeString(line).length;
    }

    const difference = totalEncodedLength - totalOriginalLength;
    return difference.toString();
  }
}

export default new Day8();
