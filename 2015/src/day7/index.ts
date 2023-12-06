import { Day } from "@lib/day";

type Wire = string;
type Signal = number;
type Operation = (a: Signal, b?: Signal) => Signal;
type Instruction = { op: Operation; inputs: Wire[] };

class Day7 extends Day {
  constructor() {
    super(7, 2015);
  }

  private parseInstructions(input: string): Map<Wire, Instruction> {
    const instructions = new Map<Wire, Instruction>();

    input.split("\n").forEach((line) => {
      const [left, right] = line.split(" -> ");
      const inputs = left.match(/[a-z]+|\d+/g) || [];
      const output = right;
      let op: Operation;

      if (left.includes("AND")) op = (a, b) => (b !== undefined ? a & b : a);
      else if (left.includes("OR"))
        op = (a, b) => (b !== undefined ? a | b : a);
      else if (left.includes("LSHIFT"))
        op = (a, b) => (b !== undefined ? a << b : a);
      else if (left.includes("RSHIFT"))
        op = (a, b) => (b !== undefined ? a >> b : a);
      else if (left.includes("NOT"))
        op = (a) => ~a & 0xffff; // bitwise NOT operation and mask to 16 bits
      else op = (a) => a; // Direct assignment

      instructions.set(output, { op, inputs });
    });

    return instructions;
  }

  private getSignal(
    wire: Wire,
    instructions: Map<Wire, Instruction>,
    cache: Map<Wire, Signal>
  ): Signal {
    if (cache.has(wire)) {
      return cache.get(wire)!;
    }

    if (!isNaN(Number(wire))) {
      return Number(wire);
    }

    const instruction = instructions.get(wire);
    if (!instruction) throw new Error(`No instruction for wire ${wire}`);

    const inputSignals = instruction.inputs.map((input) =>
      this.getSignal(input, instructions, cache)
    ) as [Signal, Signal?];

    const signal = instruction.op(...inputSignals);
    cache.set(wire, signal);
    return signal;
  }

  solveForPartOne(input: string, wire: Wire = "a"): string {
    const instructions = this.parseInstructions(input);
    const cache = new Map<Wire, Signal>();
    return this.getSignal(wire, instructions, cache).toString();
  }

  solveForPartTwo(input: string, wire: Wire = "a"): string {
    // Parse the instructions and create a cache
    const instructions = this.parseInstructions(input);
    const cache = new Map<Wire, Signal>();

    // Get the signal for wire "a" from Part One
    const signalA = this.getSignal("a", instructions, new Map<Wire, Signal>());

    // Override the signal for wire "b" with the signal from wire "a"
    instructions.set("b", { op: () => signalA, inputs: [] });

    // Clear the cache and calculate the new signal for wire "a"
    cache.clear();
    return this.getSignal(wire, instructions, cache).toString();
  }
}

export default new Day7();
