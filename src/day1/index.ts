import { Day } from "../day";
import * as fs from "fs";

class Day1 extends Day {
  constructor() {
    super(1);
  }

  private convertWordsToDigits(line: string): string {
    const digitWords = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    let firstDigit = "";
    let lastDigit = "";

    // Helper function to check if a substring is a digit word and return its numeric value
    const getDigitValue = (word: string): string => {
      const index = digitWords.indexOf(word);
      return index !== -1 ? (index + 1).toString() : "";
    };

    // Check from the start of the line for the first digit
    for (let i = 0; i < line.length; i++) {
      const char = line[i].toLowerCase();
      if (char >= "0" && char <= "9") {
        firstDigit = char;
        break;
      } else if (char >= "a" && char <= "z") {
        for (let j = i + 1; j <= line.length; j++) {
          const potentialDigit = getDigitValue(
            line.substring(i, j).toLowerCase()
          );
          if (potentialDigit) {
            firstDigit = potentialDigit;
            i = j - 1; // Skip the rest of the word
            break;
          }
        }
      }
      if (firstDigit) break;
    }

    // Check from the end of the line for the last digit
    for (let i = line.length - 1; i >= 0; i--) {
      const char = line[i].toLowerCase();
      if (char >= "0" && char <= "9") {
        lastDigit = char;
        break;
      } else if (char >= "a" && char <= "z") {
        for (let j = i; j >= 0; j--) {
          const potentialDigit = getDigitValue(
            line.substring(j, i + 1).toLowerCase()
          );
          if (potentialDigit) {
            lastDigit = potentialDigit;
            i = j; // Skip the rest of the word
            break;
          }
        }
      }
      if (lastDigit) break;
    }

    // Return the concatenated result of the first and last digits
    return firstDigit + lastDigit;
  }

  private sumCalibrationValues(lines: string[]): number {
    let sum = 0;
    let calibrationCounter = 0; // New counter for calibration values

    for (const line of lines) {
      const digits = line.match(/\d/g);

      if (digits) {
        // Use the same digit twice if there's only one digit
        const calibrationValue =
          digits.length === 1
            ? parseInt(digits[0] + digits[0], 10)
            : parseInt(digits[0] + digits[digits.length - 1], 10);
        sum += calibrationValue;
        calibrationCounter++; // Increment the counter each time a calibration value is added
      }
    }

    return sum;
  }

  private sumCalibrationValuesWithWords(lines: string[]): number {
    let sum = 0;

    for (const line of lines) {
      const calibrationValue = this.convertWordsToDigits(line);
      if (calibrationValue.length === 2) {
        sum += parseInt(calibrationValue, 10);
      }
    }

    return sum;
  }
  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    return this.sumCalibrationValues(lines).toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    return this.sumCalibrationValuesWithWords(lines).toString();
  }
}

export default new Day1();
