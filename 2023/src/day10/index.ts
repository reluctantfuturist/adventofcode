import { Day } from "@lib/day";

class Day10 extends Day {
  constructor() {
    super(10, 2023);
  }
  private directions: { [key: string]: [number, number] } = {
    N: [0, -1],
    S: [0, 1],
    E: [1, 0],
    W: [-1, 0],
  };

  private parseGrid(input: string): string[][] {
    return input.split("\n").map((line) => line.split(""));
  }

  private findStart(grid: string[][]): [number, number] {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "S") return [x, y];
      }
    }
    throw new Error("Start position not found");
  }

  private getInitialDirection(grid: string[][], x: number, y: number): string {
    // Check all four directions around the starting position 'S'
    if (y > 0 && grid[y - 1][x] === "|") return "N";
    if (y < grid.length - 1 && grid[y + 1][x] === "|") return "S";
    if (x > 0 && grid[y][x - 1] === "-") return "W";
    if (x < grid[y].length - 1 && grid[y][x + 1] === "-") return "E";
    throw new Error("Invalid starting position or grid configuration");
  }

  private traverseAndFindFarthest(
    grid: string[][],
    startX: number,
    startY: number
  ): number {
    let currentDirection = this.getInitialDirection(grid, startX, startY);
    let [x, y] = [startX, startY];
    let steps = 0;

    while (true) {
      if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
        console.log("Out of grid bounds");
        return -1;
      }

      const currentTile = grid[y][x];
      // Determine next direction based on current tile and direction
      switch (currentTile) {
        case "|":
          if (currentDirection !== "N" && currentDirection !== "S") break; // Invalid move
          break;
        case "-":
          if (currentDirection !== "E" && currentDirection !== "W") break; // Invalid move
          break;
        case "L":
          currentDirection =
            currentDirection === "S"
              ? "E"
              : currentDirection === "W"
              ? "N"
              : currentDirection;
          break;
        case "J":
          currentDirection =
            currentDirection === "S"
              ? "W"
              : currentDirection === "E"
              ? "N"
              : currentDirection;
          break;
        case "7":
          currentDirection =
            currentDirection === "N"
              ? "W"
              : currentDirection === "E"
              ? "S"
              : currentDirection;
          break;
        case "F":
          currentDirection =
            currentDirection === "N"
              ? "E"
              : currentDirection === "W"
              ? "S"
              : currentDirection;
          break;
        case "S":
          if (steps > 0) {
            //            console.log("Loop completed");
            return Math.floor(steps / 2);
          }
          break;
      }

      if (!currentDirection) {
        console.log("No valid direction found");
        break; // Break if no valid direction found
      }

      // Update position and distance
      const [dx, dy] = this.directions[currentDirection];
      x += dx;
      y += dy;
      steps++;

      //      console.log("Total steps:", steps);
    }
    return Math.floor(steps / 2);
  }

  private printGrid(grid: string[][], visited: boolean[][]): void {
    for (let y = 0; y < grid.length; y++) {
      let row = "";
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "." && !visited[y][x]) {
          row += "I"; // Mark unvisited dot cells as inside
        } else if (grid[y][x] === ".") {
          row += "O"; // Mark visited dot cells as outside
        } else {
          row += grid[y][x]; // Keep original tile
        }
      }
      console.log(row);
    }
  }

  solveForPartOne(input: string): string {
    const grid = this.parseGrid(input);
    const [startX, startY] = this.findStart(grid);
    return this.traverseAndFindFarthest(grid, startX, startY).toString();
  }

  public solveForPartTwo(input: string): string {
    return input.toString();
  }
}

export default new Day10();
