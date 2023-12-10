import { Day } from "@lib/day";

class Day8 extends Day {
  constructor() {
    super(9, 2023);
  }

  private calculateDifferences(sequence: number[]): number[] {
    return sequence.slice(1).map((num, idx) => num - sequence[idx]);
  }

  private extrapolateNextValue(sequence: number[]): number {
    //    console.log(`Original sequence: ${sequence}`);
    let layers = [sequence];
    let differences = this.calculateDifferences(sequence);

    // Build layers of differences until reaching all zeroes
    while (!differences.every((val) => val === 0)) {
      //      console.log(`Differences: ${differences}`);
      layers.push(differences);
      differences = this.calculateDifferences(differences);
    }
    layers.push(differences); // Add the all-zero layer
    //    console.log(`Final layer of zeroes: ${differences}`);

    // Work backward to fill in the next value
    for (let i = layers.length - 2; i >= 0; i--) {
      const nextDiff = layers[i + 1][layers[i + 1].length - 1];
      layers[i].push(layers[i][layers[i].length - 1] + nextDiff);
      //  console.log(`Layer ${i} after extrapolation: ${layers[i]}`);
    }

    const nextValue = layers[0][layers[0].length - 1];
    //    console.log(`Next value: ${nextValue}`);
    return nextValue;
  }

  private extrapolatePreviousValue(sequence: number[]): number {
    let layers = [sequence];
    let differences = this.calculateDifferences(sequence);

    // Build layers of differences until reaching all zeroes
    while (!differences.every((val) => val === 0)) {
      layers.unshift(differences);
      differences = this.calculateDifferences(differences);
    }
    layers.unshift(new Array(differences.length + 1).fill(0)); // Add an all-zero layer at the beginning

    // Work backward to fill in the previous value
    for (let i = 1; i < layers.length; i++) {
      const prevDiff = layers[i - 1][0];
      layers[i].unshift(layers[i][0] - prevDiff);
    }

    return layers[layers.length - 1][0]; // The previous value in the original sequence
  }

  solveForPartOne(input: string): string {
    const sequences = input
      .split("\n")
      .map((line) => line.split(" ").map(Number));
    return sequences
      .reduce((sum, seq) => sum + this.extrapolateNextValue(seq), 0)
      .toString();
  }

  solveForPartTwo(input: string): string {
    const sequences = input
      .split("\n")
      .map((line) => line.split(" ").map(Number));
    return sequences
      .reduce((sum, seq) => sum + this.extrapolatePreviousValue(seq), 0)
      .toString();
  }
}

export default new Day8();
