import { Day } from "@lib/day";

type Dimensions = [number, number, number];

class Day2 extends Day {
  constructor() {
    super(2, 2015);
  }

  private calculateWrappingPaper(dimensions: Dimensions[]): number {
    let totalPaper = 0;

    dimensions.forEach(([l, w, h]) => {
      const side1 = l * w;
      const side2 = w * h;
      const side3 = h * l;

      const surfaceArea = 2 * (side1 + side2 + side3);
      const slack = Math.min(side1, side2, side3);

      totalPaper += surfaceArea + slack;
    });

    return totalPaper;
  }

  private calculateRibbon(dimensions: Dimensions[]): number {
    let totalRibbon = 0;

    dimensions.forEach(([l, w, h]) => {
      // Find the smallest perimeter of any one face
      const perimeters = [2 * (l + w), 2 * (w + h), 2 * (h + l)];
      const smallestPerimeter = Math.min(...perimeters);

      // Calculate the volume for the bow
      const bow = l * w * h;

      // Total ribbon needed for this present
      totalRibbon += smallestPerimeter + bow;
    });

    return totalRibbon;
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const dimensionsArray: Dimensions[] = [];

    lines.forEach((line) => {
      const dimensions = line.split("x").map(Number);
      if (dimensions.length === 3) {
        dimensionsArray.push(dimensions as Dimensions);
      }
    });

    return this.calculateWrappingPaper(dimensionsArray).toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const dimensionsArray: Dimensions[] = [];

    lines.forEach((line) => {
      const dimensions = line.split("x").map(Number);
      if (dimensions.length === 3) {
        dimensionsArray.push(dimensions as Dimensions);
      }
    });

    return this.calculateRibbon(dimensionsArray).toString();
  }
}

export default new Day2();
