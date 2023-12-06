import { Day } from "@lib/day";

class Day6 extends Day {
  constructor() {
    super(6, 2023);
  }

  private calculateWaysToWin(
    raceTimes: number[],
    recordDistances: number[]
  ): number {
    let totalWays = 1;

    for (let i = 0; i < raceTimes.length; i++) {
      let waysToWinThisRace = 0;
      const T = raceTimes[i];
      const D = recordDistances[i];

      for (let x = 0; x <= T; x++) {
        const distanceTravelled = x * (T - x);
        if (distanceTravelled > D) {
          waysToWinThisRace++;
        }
      }

      totalWays *= waysToWinThisRace;
    }

    return totalWays;
  }

  private parseInput(input: string): {
    raceTimes: number[];
    recordDistances: number[];
  } {
    const lines = input.split("\n");
    const raceTimes = lines[0]
      .split(" ")
      .slice(1)
      .filter((n) => n)
      .map(Number);
    const recordDistances = lines[1]
      .split(" ")
      .slice(1)
      .filter((n) => n)
      .map(Number);

    return { raceTimes, recordDistances };
  }

  private parseInputForPartTwo(input: string): {
    raceTime: number;
    recordDistance: number;
  } {
    const lines = input.split("\n");
    const rawRaceTime = lines[0]
      .split(": ")
      .slice(1)
      .join("")
      .replace(/\s+/g, "");
    const rawRecordDistance = lines[1]
      .split(": ")
      .slice(1)
      .join("")
      .replace(/\s+/g, "");

    const raceTime = parseInt(rawRaceTime, 10);
    const recordDistance = parseInt(rawRecordDistance, 10);

    console.log(raceTime, recordDistance);
    return { raceTime, recordDistance };
  }
  solveForPartOne(input: string): string {
    const { raceTimes, recordDistances } = this.parseInput(input);
    const totalWays = this.calculateWaysToWin(raceTimes, recordDistances);
    return totalWays.toString();
  }

  solveForPartTwo(input: string): string {
    const { raceTime, recordDistance } = this.parseInputForPartTwo(input);
    const totalWays = this.calculateWaysToWin([raceTime], [recordDistance]);
    return totalWays.toString();
  }
}

export default new Day6();
