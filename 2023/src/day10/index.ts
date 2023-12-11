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
  ): [number, Map<string, string>] {
    let currentDirection = this.getInitialDirection(grid, startX, startY);
    let [x, y] = [startX, startY];
    let steps = 0;
    let vectorsMap = new Map<string, string>();

    while (true) {
      if (!(x === startX && y === startY && steps > 0)) {
        // Exclude updating the start cell when loop closes
        // Record the incoming direction for the current cell
        vectorsMap.set(`${x},${y}`, currentDirection);
      }

      console.log(
        `Current position: (${x}, ${y}), Direction: ${currentDirection}`
      );

      // Check if we're at the loop's end
      if (grid[y][x] === "S" && steps > 0) {
        console.log("Loop completed");
        break;
      }

      // Determine the next direction based on the current tile and direction
      const nextDirection = this.determineNextDirection(
        grid[y][x],
        currentDirection,
        steps
      );
      console.log(
        `Current position: (${x}, ${y}), Direction: ${currentDirection}, Next Direction: ${nextDirection}`
      );

      // Update the current direction for the next iteration
      if (nextDirection) {
        currentDirection = nextDirection;
      } else {
        console.log("No valid direction found");
        break;
      }

      // Move to the next cell
      const [dx, dy] = this.directions[currentDirection];
      x += dx;
      y += dy;
      steps++;
      console.log(`Moving to: (${x}, ${y}), Steps: ${steps}`);

      // Check if we are out of grid bounds
      if (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length) {
        console.log("Out of grid bounds");
        return [-1, vectorsMap];
      }
    }

    return [Math.floor(steps / 2), vectorsMap];
  }

  private determineNextDirection(
    currentTile: string,
    currentDirection: string,
    steps: number
  ): string | null {
    // Special handling for the start tile ('S') at the beginning of traversal
    if (currentTile === "S" && steps === 0) {
      return currentDirection;
    }
    switch (currentTile) {
      case "|":
        // Continue in the same direction if it's north or south
        return currentDirection === "N" || currentDirection === "S"
          ? currentDirection
          : null;
      case "-":
        // Continue in the same direction if it's east or west
        return currentDirection === "E" || currentDirection === "W"
          ? currentDirection
          : null;
      case "L":
        // Change direction based on current direction
        return currentDirection === "S"
          ? "E"
          : currentDirection === "W"
          ? "N"
          : null;
      case "J":
        // Change direction based on current direction
        return currentDirection === "S"
          ? "W"
          : currentDirection === "E"
          ? "N"
          : null;
      case "7":
        // Change direction based on current direction
        return currentDirection === "N"
          ? "W"
          : currentDirection === "E"
          ? "S"
          : null;
      case "F":
        // Change direction based on current direction
        return currentDirection === "N"
          ? "E"
          : currentDirection === "W"
          ? "S"
          : null;
      default:
        // For other cases like 'S', return null as there's no next direction
        return null;
    }
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

  private isInside(
    cellX: number,
    cellY: number,
    grid: string[][],
    vectorsMap: Map<string, string>
  ): boolean {
    let rayCount = 0;

    // Skip the ray casting for boundary cells
    const currentKey = `${cellX},${cellY}`;
    if (vectorsMap.has(currentKey)) {
      return false;
    }

    for (let x = cellX; x < grid[0].length; x++) {
      const key = `${x},${cellY}`;
      if (vectorsMap.has(key)) {
        const incomingDirection = vectorsMap.get(key);

        // Check if the ray intersects the loop with incoming direction
        if (incomingDirection === "N" || incomingDirection === "S") {
          rayCount++;
          console.log(
            `Ray intersects at (${x}, ${cellY}), Direction: ${incomingDirection}, RayCount: ${rayCount}`
          );
        }
      }
    }

    return rayCount % 2 !== 0;
  }

  public findCellsInsideLoop(grid: string[][]): boolean[][] {
    const [startX, startY] = this.findStart(grid); // Assuming you have a method to find loop start
    const [_, vectorsMap] = this.traverseAndFindFarthest(grid, startX, startY);
    const insideMap = grid.map((row) => row.map(() => false));

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const isInsideCell = this.isInside(x, y, grid, vectorsMap);
        insideMap[y][x] = isInsideCell;
        console.log(
          `Cell (${x}, ${y}) is ${isInsideCell ? "inside" : "outside"}`
        );
      }
    }

    return insideMap;
  }

  solveForPartOne(input: string): string {
    const grid = this.parseGrid(input);
    const [startX, startY] = this.findStart(grid);
    return this.traverseAndFindFarthest(grid, startX, startY)[0].toString();
  }

  public solveForPartTwo(input: string): string {
    const grid = this.parseGrid(input); // Assuming you have a method to parse the input string into a grid
    const insideMap = this.findCellsInsideLoop(grid);

    let insideCount = 0;
    for (let row of insideMap) {
      for (let cell of row) {
        if (cell) {
          insideCount++;
        }
      }
    }

    return insideCount.toString();
  }
}

export default new Day10();
