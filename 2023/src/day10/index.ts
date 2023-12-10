import { Day } from "@lib/day";

class Day10 extends Day {
  constructor() {
    super(10, 2023);
  }

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
    const directions: { [key: string]: [number, number] } = {
      N: [0, -1],
      S: [0, 1],
      E: [1, 0],
      W: [-1, 0],
    };
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
      const [dx, dy] = directions[currentDirection];
      x += dx;
      y += dy;
      steps++;

      //      console.log("Total steps:", steps);
    }
    return Math.floor(steps / 2);
  }

  private printGrid(grid: string[][], visited: boolean[][]): string[][] {
    let newGrid: string[][] = [];
    for (let y = 0; y < grid.length; y++) {
      let row = [];
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "." && !visited[y][x]) {
          row.push("I"); // Mark unvisited dot cells as inside
        } else if (grid[y][x] === ".") {
          row.push("O"); // Mark visited dot cells as outside
        } else {
          row.push(grid[y][x]); // Keep original tile
        }
      }
      newGrid.push(row);
      console.log(row.join(""));
    }
    return newGrid;
  }

  private sameRowPairs = ["||", "JL", "7F", "JF", "7L", "7|", "J|", "|L", "|F"];

  private sameColumnlPairs = [
    "--",
    "-7",
    "-F",
    "J-",
    "L-",
    "JF",
    "J7",
    "LF",
    "L7",
  ];

  private floodFill(
    grid: string[][],
    x: number,
    y: number,
    visited: boolean[][]
  ): void {
    if (
      x < 0 ||
      x >= grid[0].length ||
      y < 0 ||
      y >= grid.length ||
      visited[y][x] ||
      ["|", "-", "7", "F", "J", "L", "S"].includes(grid[y][x]) // Add this line
    ) {
      return;
    }

    visited[y][x] = true;

    // Mark all reachable cells as outside by default
    grid[y][x] = "O";

    const dx = [-1, 1, 0, 0];
    const dy = [0, 0, -1, 1];

    for (let i = 0; i < 4; i++) {
      this.floodFill(grid, x + dx[i], y + dy[i], visited);
    }
  }

  solveForPartOne(input: string): string {
    const grid = this.parseGrid(input);
    const [startX, startY] = this.findStart(grid);
    return this.traverseAndFindFarthest(grid, startX, startY).toString();
  }

  public solveForPartTwo(input: string): string {
    const grid = this.parseGrid(input);
    const visited = Array(grid.length)
      .fill(0)
      .map(() => Array(grid[0].length).fill(false));

    // Perform flood fill from all cells on the edge of the grid
    for (let x = 0; x < grid[0].length; x++) {
      this.floodFill(grid, x, 0, visited);
      this.floodFill(grid, x, grid.length - 1, visited);
    }
    for (let y = 0; y < grid.length; y++) {
      this.floodFill(grid, 0, y, visited);
      this.floodFill(grid, grid[0].length - 1, y, visited);
    }

    const updatedGrid = this.printGrid(grid, visited);
    const insideCount = updatedGrid
      .flat()
      .filter((cell) => cell === "I").length;
    return insideCount.toString();
  }
}

export default new Day10();
