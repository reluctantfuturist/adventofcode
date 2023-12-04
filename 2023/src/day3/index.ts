import { Day } from "@lib/day";

class Day3 extends Day {
  constructor() {
    super(3, 2023);
  }

  // Helper function to check if a cell is a symbol (not a number or period)
  isSymbol(cell: string): boolean {
    return isNaN(parseInt(cell)) && cell !== ".";
  }

  // Convert the input string into a 2D array
  convertInputToGrid(input: string): string[][] {
    return input.split("\n").map((line) => line.trim().split(""));
  }

  // Helper function to check if a number is adjacent to a symbol
  isAdjacentToSymbol(x: number, y: number, grid: string[][]): boolean {
    const height = grid.length;
    const width = grid[0].length;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < height &&
          ny >= 0 &&
          ny < width &&
          this.isSymbol(grid[nx][ny])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Helper function to get all adjacent part numbers to a cell
  getAdjacentPartNumbers(x: number, y: number, grid: string[][]): number[] {
    const partNumbers: number[] = [];
    const visited = new Set<string>();
    const height = grid.length;
    const width = grid[0].length;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          nx < height &&
          ny >= 0 &&
          ny < width &&
          !isNaN(parseInt(grid[nx][ny])) &&
          !visited.has(`${nx},${ny}`) &&
          grid[x][y] === "*"
        ) {
          let number = "";
          let currentY = ny;
          // Move to the leftmost cell of the part number
          while (currentY >= 0 && !isNaN(parseInt(grid[nx][currentY]))) {
            currentY--;
          }
          // Start constructing the part number from the left
          currentY++;
          while (currentY < width && !isNaN(parseInt(grid[nx][currentY]))) {
            number += grid[nx][currentY];
            visited.add(`${nx},${currentY}`);
            currentY++;
          }
          partNumbers.push(parseInt(number));
        }
      }
    }
    return partNumbers;
  }

  solveForPartOne(input: string): string {
    const grid = this.convertInputToGrid(input);
    let sum = 0;
    const visited = new Set<string>();
    const height = grid.length;
    const width = grid[0].length;

    // Iterate over the grid to find and sum part numbers
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if (!isNaN(parseInt(grid[x][y])) && !visited.has(`${x},${y}`)) {
          let number = "";
          let ny = y;
          let isAdjacent = false;

          // Construct the complete number
          while (ny < width && !isNaN(parseInt(grid[x][ny]))) {
            number += grid[x][ny];
            visited.add(`${x},${ny}`);
            if (this.isAdjacentToSymbol(x, ny, grid)) {
              isAdjacent = true;
            }
            ny++;
          }

          // Add to sum if adjacent to a symbol
          if (isAdjacent) {
            sum += parseInt(number);
          }
        }
      }
    }

    return sum.toString();
  }

  solveForPartTwo(input: string): string {
    const grid = this.convertInputToGrid(input);
    let sum = 0;
    const height = grid.length;
    const width = grid[0].length;

    // Iterate over the grid to find all gears and calculate their gear ratios
    for (let x = 0; x < height; x++) {
      for (let y = 0; y < width; y++) {
        if (this.isSymbol(grid[x][y])) {
          const partNumbers = this.getAdjacentPartNumbers(x, y, grid);
          if (partNumbers.length === 2) {
            sum += partNumbers[0] * partNumbers[1];
          }
        }
      }
    }

    return sum.toString();
  }
}

export default new Day3();
