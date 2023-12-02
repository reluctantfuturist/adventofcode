import { Day } from "@lib/day";

class Day3 extends Day {
  constructor() {
    super(3, 2015);
  }

  private countHousesWithPresents(directions: string): number {
    const visitedHouses = new Set<string>();
    let x = 0; // Horizontal position
    let y = 0; // Vertical position

    // Add the starting location
    visitedHouses.add(`${x},${y}`);

    for (const direction of directions) {
      switch (direction) {
        case "^":
          y++;
          break; // North
        case "v":
          y--;
          break; // South
        case ">":
          x++;
          break; // East
        case "<":
          x--;
          break; // West
      }
      visitedHouses.add(`${x},${y}`);
    }

    return visitedHouses.size;
  }

  private countHousesWithTeam(directions: string): number {
    const visitedHouses = new Set<string>();
    let santaX = 0,
      santaY = 0; // Santa's position
    let roboX = 0,
      roboY = 0; // Robo-Santa's position
    let isSantaTurn = true; // Flag to alternate between Santa and Robo-Santa

    // Add the starting location
    visitedHouses.add(`0,0`);

    for (const direction of directions) {
      if (isSantaTurn) {
        // Move Santa
        switch (direction) {
          case "^":
            santaY++;
            break; // North
          case "v":
            santaY--;
            break; // South
          case ">":
            santaX++;
            break; // East
          case "<":
            santaX--;
            break; // West
        }
        visitedHouses.add(`${santaX},${santaY}`);
      } else {
        // Move Robo-Santa
        switch (direction) {
          case "^":
            roboY++;
            break; // North
          case "v":
            roboY--;
            break; // South
          case ">":
            roboX++;
            break; // East
          case "<":
            roboX--;
            break; // West
        }
        visitedHouses.add(`${roboX},${roboY}`);
      }
      isSantaTurn = !isSantaTurn; // Alternate turns
    }

    return visitedHouses.size;
  }

  solveForPartOne(input: string): string {
    return this.countHousesWithPresents(input).toString();
  }

  solveForPartTwo(input: string): string {
    return this.countHousesWithTeam(input).toString();
  }
}

export default new Day3();
