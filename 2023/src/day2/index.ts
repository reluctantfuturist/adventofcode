import { Day } from "@lib/day";

interface CubeCounts {
  red: number;
  green: number;
  blue: number;
}

interface Game {
  id: number;
  draws: CubeCounts[];
}

const bag: CubeCounts = { red: 12, green: 13, blue: 14 };

class Day2 extends Day {
  constructor() {
    super(2, 2023);
  }

  private parseInput(input: string): Game[] {
    return input
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => {
        const [idPart, drawPart] = line.split(": ");
        const id = parseInt(idPart.replace("Game ", ""), 10);
        const draws = drawPart.split("; ").map((draw) => {
          const cubeCounts: CubeCounts = { red: 0, green: 0, blue: 0 };
          draw.split(", ").forEach((cubeInfo) => {
            const [countStr, color] = cubeInfo.split(" ");
            cubeCounts[color as keyof CubeCounts] += parseInt(countStr, 10);
          });
          return cubeCounts;
        });
        return { id, draws };
      });
  }

  private isGamePossible(game: Game, bag: CubeCounts): boolean {
    return game.draws.every((draw) => {
      return Object.keys(draw).every((color) => {
        return (
          draw[color as keyof CubeCounts] <= bag[color as keyof CubeCounts]
        );
      });
    });
  }

  private sumOfPossibleGameIds(games: Game[], bag: CubeCounts): number {
    return games.reduce((sum, game) => {
      return sum + (this.isGamePossible(game, bag) ? game.id : 0);
    }, 0);
  }

  private findMinimumCubesForGame(game: Game): CubeCounts {
    const minCubes: CubeCounts = { red: 0, green: 0, blue: 0 };
    game.draws.forEach((draw) => {
      Object.keys(draw).forEach((color) => {
        minCubes[color as keyof CubeCounts] = Math.max(
          minCubes[color as keyof CubeCounts],
          draw[color as keyof CubeCounts]
        );
      });
    });
    return minCubes;
  }

  private powerOfSet(cubes: CubeCounts): number {
    return cubes.red * cubes.green * cubes.blue;
  }

  private sumOfPowersOfMinimumSets(games: Game[]): number {
    return games.reduce((sum, game) => {
      const minCubes = this.findMinimumCubesForGame(game);
      return sum + this.powerOfSet(minCubes);
    }, 0);
  }

  solveForPartOne(input: string): string {
    const games = this.parseInput(input);
    const sumIds = this.sumOfPossibleGameIds(games, bag);
    return sumIds.toString();
  }

  solveForPartTwo(input: string): string {
    const games = this.parseInput(input);
    return this.sumOfPowersOfMinimumSets(games).toString();
  }
}

export default new Day2();
