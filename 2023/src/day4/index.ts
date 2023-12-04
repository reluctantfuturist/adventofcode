import { Day } from "@lib/day";
import { performance } from "perf_hooks";

class Day4 extends Day {
  constructor() {
    super(4, 2023);
  }

  private calculateCardPoints(card: string): number {
    const [winningNumbers, yourNumbers] = card
      .split("|")
      .map((part) => new Set(part.trim().split(/\s+/)));
    let points = 0;
    let isMatchFound = false;

    yourNumbers.forEach((num) => {
      if (winningNumbers.has(num)) {
        points = isMatchFound ? points * 2 : 1;
        isMatchFound = true;
      }
    });

    return points;
  }

  private matchCounts: Map<number, number> = new Map();

  private countMatchingNumbers(card: string, cardNumber: number): number {
    if (this.matchCounts.has(cardNumber)) {
      return this.matchCounts.get(cardNumber)!;
    }

    const [winningNumbersPart, yourNumbersPart] = card.split("|");
    const winningNumbers = new Set(winningNumbersPart.trim().split(/\s+/));
    const yourNumbers = new Set(yourNumbersPart.trim().split(/\s+/));
    const count = Array.from(yourNumbers).reduce(
      (acc, num) => (winningNumbers.has(num) ? acc + 1 : acc),
      0
    );

    this.matchCounts.set(cardNumber, count);
    return count;
  }

  solveForPartOne(input: string): string {
    const cards = input.split("\n");
    const totalPoints = cards.reduce(
      (sum, card) => sum + this.calculateCardPoints(card),
      0
    );
    return totalPoints.toString();
  }

  solveForPartTwo(input: string): string {
    const startTime = performance.now(); // Start timing
    const cardLines = input.split("\n").map((line) => line.trim());
    let totalCards = 0;
    let queue = cardLines.map((card, index) => ({ card, index }));
    let currentIndex = 0; // Use an index to track the current position

    while (currentIndex < queue.length) {
      const { card, index } = queue[currentIndex++];
      totalCards++;

      const matches = this.countMatchingNumbers(card, index + 1);
      for (let i = 1; i <= matches; i++) {
        const nextIndex = index + i;
        if (nextIndex < cardLines.length) {
          queue.push({ card: cardLines[nextIndex], index: nextIndex });
        }
      }
    }

    const endTime = performance.now(); // End timing
    const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;

    console.log(`Total cards processed: ${totalCards}`);
    if (minutes > 0) {
      console.log(
        `Time elapsed: ${minutes} minutes, ${seconds.toFixed(2)} seconds`
      );
    } else {
      console.log(`Time elapsed: ${seconds.toFixed(2)} seconds`);
    }

    return totalCards.toString();
  }
}

export default new Day4();
