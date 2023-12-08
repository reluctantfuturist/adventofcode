import { Day } from "@lib/day";

class Day8 extends Day {
  constructor() {
    super(8, 2023);
  }

  private buildNetwork(
    nodeDefinitions: string[]
  ): Map<string, [string, string]> {
    const network = new Map<string, [string, string]>();
    nodeDefinitions.forEach((def) => {
      const [node, neighbors] = def.split(" = ");
      const match = neighbors.match(/\(([^,]+), ([^)]+)\)/);
      const [left, right] = match ? match.slice(1) : ["", ""];
      network.set(node.trim(), [left.trim(), right.trim()]);
    });
    return network;
  }

  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }

  private lcm(a: number, b: number): number {
    return (a * b) / this.gcd(a, b);
  }

  solveForPartOne(input: string): string {
    const [instructions, nodeData] = input.split("\n\n");
    const network = this.buildNetwork(nodeData.split("\n"));
    let currentNode = "AAA";
    let steps = 0;
    let instructionIndex = 0;

    while (currentNode !== "ZZZ") {
      const direction =
        instructions[instructionIndex % instructions.length] === "R" ? 1 : 0;
      const node = network.get(currentNode);
      if (!node) {
        throw new Error(`Node ${currentNode} not found in network`);
      }
      currentNode = node[direction];
      steps++;
      instructionIndex++;
    }

    return steps.toString();
  }

  solveForPartTwo(input: string): string {
    const [instructions, nodeData] = input.split("\n\n");
    const network = this.buildNetwork(nodeData.split("\n"));

    // Find all 'A'-ending nodes
    const aEndingNodes = Array.from(network.keys()).filter((node) =>
      node.endsWith("A")
    );

    // Calculate steps for each 'A'-ending node
    const stepsToZ = aEndingNodes.map((aNode) =>
      this.calculateStepsFromAToZ(aNode, instructions, network)
    );

    // Calculate LCM of all step counts
    let overallLCM = stepsToZ[0];
    for (let i = 1; i < stepsToZ.length; i++) {
      overallLCM = this.lcm(overallLCM, stepsToZ[i]);
    }

    return overallLCM.toString();
  }

  private calculateStepsFromAToZ(
    startNode: string,
    instructions: string,
    network: Map<string, [string, string]>
  ): number {
    let currentNode = startNode;
    let steps = 0;
    let instructionIndex = 0;

    while (!currentNode.endsWith("Z")) {
      const direction =
        instructions[instructionIndex % instructions.length] === "R" ? 1 : 0;
      const node = network.get(currentNode);
      if (!node) {
        throw new Error(`Node ${currentNode} not found in network`);
      }
      currentNode = node[direction];
      steps++;
      instructionIndex++;
    }

    return steps;
  }
}

export default new Day8();
