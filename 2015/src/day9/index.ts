import { Day } from "@lib/day";

class Day9 extends Day {
  constructor() {
    super(9, 2015);
  }

  private parseInput(input: string): Map<string, Map<string, number>> {
    const graph = new Map<string, Map<string, number>>();
    input.split("\n").forEach((line) => {
      const [path, distance] = line.split(" = ");
      const [city1, city2] = path.split(" to ");

      if (!graph.has(city1)) graph.set(city1, new Map());
      if (!graph.has(city2)) graph.set(city2, new Map());

      graph.get(city1)!.set(city2, parseInt(distance));
      graph.get(city2)!.set(city1, parseInt(distance));
    });

    return graph;
  }

  private getAllPermutations<T>(array: T[]): T[][] {
    if (array.length === 1) return [array];

    const permutations: T[][] = [];
    array.forEach((item, i) => {
      const rest = array.slice(0, i).concat(array.slice(i + 1));
      this.getAllPermutations(rest).forEach((permutation) => {
        permutations.push([item].concat(permutation));
      });
    });

    return permutations;
  }

  private calculateTotalDistance(
    permutation: string[],
    graph: Map<string, Map<string, number>>
  ): number {
    let totalDistance = 0;
    for (let i = 0; i < permutation.length - 1; i++) {
      totalDistance += graph.get(permutation[i])!.get(permutation[i + 1])!;
    }
    return totalDistance;
  }

  solveForPartOne(input: string): string {
    const graph = this.parseInput(input);
    const cities = Array.from(graph.keys());
    const permutations = this.getAllPermutations(cities);

    let minDistance = Infinity;
    permutations.forEach((permutation) => {
      const distance = this.calculateTotalDistance(permutation, graph);
      if (distance < minDistance) minDistance = distance;
    });

    return minDistance.toString();
  }

  solveForPartTwo(input: string): string {
    const graph = this.parseInput(input);
    const cities = Array.from(graph.keys());
    const permutations = this.getAllPermutations(cities);

    let maxDistance = 0;
    permutations.forEach((permutation) => {
      const distance = this.calculateTotalDistance(permutation, graph);
      if (distance > maxDistance) maxDistance = distance;
    });

    return maxDistance.toString();
  }
}

export default new Day9();
