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

  private isSqueezableGap(
    grid: string[][],
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ): boolean {
    // Check horizontally adjacent tiles (same row, adjacent columns)
    if (direction === "vertical" && x < grid[0].length - 1) {
      const horizontalPair = grid[y][x] + grid[y][x + 1];
      const horizontalPairs = [
        "||",
        "JL",
        "7F",
        "JF",
        "7L",
        "7|",
        "J|",
        "|L",
        "|F",
      ];
      if (horizontalPairs.includes(horizontalPair)) {
        console.log(
          `Squeezable gap encountered horizontally at (${y}, ${x}) and (${y}, ${
            x + 1
          }) forming '${horizontalPair}'`
        );
        return true;
      }
    }

    // Check vertically adjacent tiles (adjacent rows, same column)
    if (direction === "horizontal" && y < grid.length - 1) {
      const verticalPair = grid[y][x] + grid[y + 1][x];
      const verticalPairs = [
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
      if (verticalPairs.includes(verticalPair)) {
        console.log(
          `Squeezable gap encountered vertically at (${y}, ${x}) and (${
            y + 1
          }, ${x}) forming '${verticalPair}'`
        );
        return true;
      }
    }

    return false;
  }

  private floodFill(
    grid: string[][],
    visited: boolean[][],
    x: number,
    y: number
  ): void {
    if (
      x < 0 ||
      y < 0 ||
      x >= grid[0].length ||
      y >= grid.length ||
      visited[y][x]
    ) {
      return;
    }

    visited[y][x] = true;
    console.log(`Visiting (${x}, ${y}), Tile: ${grid[y][x]}`);

    // Check each direction with respect to squeezable gaps
    this.checkAndFill(grid, visited, x - 1, y, "vertical"); // Left
    this.checkAndFill(grid, visited, x + 1, y, "vertical"); // Right
    this.checkAndFill(grid, visited, x, y - 1, "horizontal"); // Up
    this.checkAndFill(grid, visited, x, y + 1, "horizontal"); // Down
  }

  private checkAndFill(
    grid: string[][],
    visited: boolean[][],
    x: number,
    y: number,
    direction: "horizontal" | "vertical"
  ): void {
    if (
      x >= 0 &&
      y >= 0 &&
      x < grid[0].length &&
      y < grid.length &&
      !visited[y][x]
    ) {
      if (this.isSqueezableGap(grid, x, y, direction)) {
        console.log(
          `Encountered squeezable gap at (${x}, ${y}), direction: ${direction}`
        );
      } else {
        this.floodFill(grid, visited, x, y);
      }
    }
  }

  private markInteriorTiles(grid: string[][], visited: boolean[][]): void {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (!visited[y][x] && grid[y][x] === ".") {
          grid[y][x] = "I"; // Mark as inside
        }
      }
    }
  }

  solveForPartOne(input: string): string {
    const grid = this.parseGrid(input);
    const [startX, startY] = this.findStart(grid);
    return this.traverseAndFindFarthest(grid, startX, startY).toString();
  }

  public solveForPartTwo(input: string): string {
    const grid = this.parseGrid(input);
    const visited = grid.map((row) => row.map(() => false));

    // Perform flood fill from the edges
    for (let x = 0; x < grid[0].length; x++) {
      this.floodFill(grid, visited, x, 0);
      this.floodFill(grid, visited, x, grid.length - 1);
    }
    for (let y = 0; y < grid.length; y++) {
      this.floodFill(grid, visited, 0, y);
      this.floodFill(grid, visited, grid[0].length - 1, y);
    }

    // Mark interior tiles
    this.markInteriorTiles(grid, visited);

    this.printGrid(grid, visited);

    // Count the number of inside cells
    let insideCount = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "I") {
          insideCount++;
        }
      }
    }

    return insideCount.toString();
  }
}

export default new Day10();
