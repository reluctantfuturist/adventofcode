import { Day } from "@lib/day";
import { performance } from "perf_hooks";

type Range = { start: number; length: number; destStart: number };
type RangeMap = Range[];

class Day5 extends Day {
  constructor() {
    super(5, 2023);
  }
  private startTime = performance.now(); // Start timing

  private splitInput(input: string): [number[], string[]] {
    const sections = input.split("\n\n");
    const seeds = sections[0].split(": ")[1].split(" ").map(Number);

    return [seeds, sections.slice(1)];
  }

  public splitInputForPartTwo(input: string): [[number, number][], string[]] {
    const sections = input.split("\n\n");
    const seedRangePairs = sections[0].split(": ")[1].split(" ").map(Number);

    const seedRanges: [number, number][] = [];
    for (let i = 0; i < seedRangePairs.length; i += 2) {
      seedRanges.push([seedRangePairs[i], seedRangePairs[i + 1]]);
    }

    return [seedRanges, sections.slice(1)];
  }

  public parseAllMaps(sections: string[]): RangeMap[] {
    return sections.map((section) => {
      const lines = section.split("\n").slice(1);
      return this.parseMap(lines);
    });
  }

  private parseMap(mapData: string[]): RangeMap {
    const ranges: RangeMap = [];

    for (const line of mapData) {
      const [destStart, srcStart, rangeLength] = line.split(" ").map(Number);
      ranges.push({ start: srcStart, length: rangeLength, destStart });
    }

    return ranges;
  }

  private mapNumber(number: number, rangeMap: RangeMap): number {
    for (const range of rangeMap) {
      if (number >= range.start && number < range.start + range.length) {
        return range.destStart + (number - range.start);
      }
    }
    return number;
  }

  public mapSeedThroughCategories(seed: number, maps: RangeMap[]): number {
    let currentSeed = seed;

    for (const map of maps) {
      let mapped = false;
      for (const range of map) {
        if (
          currentSeed >= range.start &&
          currentSeed < range.start + range.length
        ) {
          currentSeed = range.destStart + (currentSeed - range.start);
          mapped = true;
          break; // Break out of the inner loop once a mapping is found
        }
      }
      if (!mapped) {
        // If no mapping was found in the current map, continue with the same seed value
        continue;
      }
    }

    return currentSeed;
  }

  private findLowestLocation(seeds: number[], maps: RangeMap[]): number {
    let lowestLocation = Infinity;

    for (const seed of seeds) {
      const location = this.mapSeedThroughCategories(seed, maps);
      if (location < lowestLocation) {
        lowestLocation = location;
      }
    }
    const endTime = performance.now(); // End timing
    const timeElapsed = (endTime - this.startTime) / 1000; // Convert to seconds
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    if (minutes > 0) {
      console.log(
        `Time elapsed: ${minutes} minutes, ${seconds.toFixed(2)} seconds`
      );
    } else {
      console.log(`Time elapsed: ${seconds.toFixed(2)} seconds`);
    }

    return lowestLocation;
  }

  private findLowestLocationForRanges(
    seedRanges: [number, number][],
    maps: RangeMap[]
  ): number {
    let lowestLocation = Infinity;

    for (const [start, length] of seedRanges) {
      for (let i = 0; i < length; i++) {
        const seed = start + i;
        const location = this.mapSeedThroughCategories(seed, maps);
        if (location < lowestLocation) {
          lowestLocation = location;
        }
      }
    }

    return lowestLocation;
  }

  solveForPartOne(input: string): string {
    const [seeds, mapSections] = this.splitInput(input);
    const maps = this.parseAllMaps(mapSections);
    return this.findLowestLocation(seeds, maps).toString();
  }

  solveForPartTwo(input: string): string {
    const startTime = performance.now();
    const [seedRanges, mapSections] = this.splitInputForPartTwo(input);
    const maps = this.parseAllMaps(mapSections);
    const result = this.findLowestLocationForRanges(
      seedRanges,
      maps
    ).toString();

    // End timing
    const endTime = performance.now();
    const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    if (minutes > 0) {
      console.log(
        `Part Two Time elapsed: ${minutes} minutes, ${seconds.toFixed(
          2
        )} seconds`
      );
    } else {
      console.log(`Part Two Time elapsed: ${seconds.toFixed(2)} seconds`);
    }

    return result;
  }
}

export default new Day5();
