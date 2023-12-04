import { Day } from "@lib/day";
type LightAction = "on" | "off" | "toggle";
type Coordinate = [number, number];
type Instruction = { action: LightAction; from: Coordinate; to: Coordinate };

class LightGrid {
  private grid: boolean[][];

  constructor(size: number) {
    this.grid = Array.from({ length: size }, () => Array(size).fill(false));
  }

  applyInstruction(instruction: Instruction) {
    const { action, from, to } = instruction;
    for (let x = from[0]; x <= to[0]; x++) {
      for (let y = from[1]; y <= to[1]; y++) {
        switch (action) {
          case "on":
            this.grid[x][y] = true;
            break;
          case "off":
            this.grid[x][y] = false;
            break;
          case "toggle":
            this.grid[x][y] = !this.grid[x][y];
            break;
        }
      }
    }
  }

  countLitLights(): number {
    return this.grid.flat().filter((light) => light).length;
  }
}

class BrightnessGrid {
  private grid: number[][];

  constructor(size: number) {
    this.grid = Array.from({ length: size }, () => Array(size).fill(0));
  }

  applyInstruction(instruction: Instruction) {
    const { action, from, to } = instruction;
    for (let x = from[0]; x <= to[0]; x++) {
      for (let y = from[1]; y <= to[1]; y++) {
        switch (action) {
          case "on":
            this.grid[x][y] += 1;
            break;
          case "off":
            this.grid[x][y] = Math.max(0, this.grid[x][y] - 1);
            break;
          case "toggle":
            this.grid[x][y] += 2;
            break;
        }
      }
    }
  }

  getTotalBrightness(): number {
    return this.grid.flat().reduce((acc, brightness) => acc + brightness, 0);
  }
}

function parseInstruction(instruction: string): Instruction {
  const words = instruction.split(" ");
  const action: LightAction =
    words[0] === "toggle" ? "toggle" : (words[1] as LightAction);
  const fromStr = words[words.length - 3];
  const toStr = words[words.length - 1];
  const from: Coordinate = fromStr.split(",").map(Number) as Coordinate;
  const to: Coordinate = toStr.split(",").map(Number) as Coordinate;

  return { action, from, to };
}

class Day6 extends Day {
  constructor() {
    super(6, 2015);
  }

  solveForPartOne(input: string): string {
    const instructions = input.split("\n").map(parseInstruction);
    const lightGrid = new LightGrid(1000);

    instructions.forEach((instruction) =>
      lightGrid.applyInstruction(instruction)
    );

    return lightGrid.countLitLights().toString();
  }

  solveForPartTwo(input: string): string {
    const instructions = input.split("\n").map(parseInstruction);
    const brightnessGrid = new BrightnessGrid(1000);

    instructions.forEach((instruction) =>
      brightnessGrid.applyInstruction(instruction)
    );

    return brightnessGrid.getTotalBrightness().toString();
  }
}

export default new Day6();
