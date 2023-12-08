import { Day } from "@lib/day";

interface Hand {
  type: string;
  originalCards: string[];
  jokerReplacedHand: string[];
}

class Day7 extends Day {
  constructor() {
    super(7, 2023);
  }

  private cardStrength = {
    A: 14,
    K: 13,
    Q: 12,
    J: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
  };

  private cardStrengthForPartTwo = {
    A: 13,
    K: 12,
    Q: 11,
    T: 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
    J: 1, // J is now the weakest card
  };

  private handTypes = {
    "Five of a kind": 7,
    "Four of a kind": 6,
    "Full house": 5,
    "Three of a kind": 4,
    "Two pair": 3,
    "One pair": 2,
    "High card": 1,
  };

  private classifyHand(hand: string): Hand {
    const cardCounts: Record<string, number> = {};
    for (const card of hand) {
      cardCounts[card] = (cardCounts[card] || 0) + 1;
    }

    // Convert the hand string into an array of cards
    const cardsArray = hand.split("");

    let type = "High card"; // Default type
    const patternCounts = Object.values(cardCounts).sort((a, b) => b - a);

    if (patternCounts[0] === 5) {
      type = "Five of a kind";
    } else if (patternCounts[0] === 4) {
      type = "Four of a kind";
    } else if (patternCounts[0] === 3 && patternCounts[1] === 2) {
      type = "Full house";
    } else if (patternCounts[0] === 3) {
      type = "Three of a kind";
    } else if (patternCounts[0] === 2 && patternCounts[1] === 2) {
      type = "Two pair";
    } else if (patternCounts[0] === 2) {
      type = "One pair";
    }

    return { type, originalCards: cardsArray, jokerReplacedHand: cardsArray };
  }

  private classifyHandForPartTwo(hand: string): Hand {
    const cardCounts: Record<string, number> = {};
    let jokerCount = 0;

    // First, count all the non-joker cards
    for (const card of hand) {
      if (card === "J") {
        jokerCount++;
      } else {
        cardCounts[card] = (cardCounts[card] || 0) + 1;
      }
    }

    // Then, determine the joker replacement
    let jokerReplacement: string | null = null;
    let maxCount = 0;
    for (const cardType in cardCounts) {
      if (
        cardCounts[cardType] > maxCount ||
        (cardCounts[cardType] === maxCount &&
          this.cardStrengthForPartTwo[
            cardType as keyof typeof this.cardStrengthForPartTwo
          ] >
            this.cardStrengthForPartTwo[
              jokerReplacement as keyof typeof this.cardStrengthForPartTwo
            ])
      ) {
        jokerReplacement = cardType;
        maxCount = cardCounts[cardType];
      }
    }

    // If the hand is all jokers, set jokerReplacement to the card with the highest strength
    if (jokerReplacement === null) {
      jokerReplacement = "A";
    }

    // Add the jokers to the count of the card they are replacing
    cardCounts[jokerReplacement] =
      (cardCounts[jokerReplacement] || 0) + jokerCount;
    // Convert the hand string into an array of cards
    const cardsArray = hand.split("");

    // Replace "J" with the card that it's pretending to be
    const jokerReplacedHand = cardsArray.map((card) =>
      card === "J" ? jokerReplacement! : card
    );

    /*     // Log the original hand and the hand that jokers "create" only if the hand contains two or more jokers
    if (jokerCount >= 2) {
      console.log(
        `Original hand: ${hand}, Hand that jokers create: ${jokerReplacedHand.join(
          ""
        )}`
      );
    }
 */
    let type = "High card"; // Default type
    const patternCounts = Object.values(cardCounts).sort((a, b) => b - a);

    if (patternCounts[0] === 5) {
      type = "Five of a kind";
    } else if (patternCounts[0] === 4) {
      type = "Four of a kind";
    } else if (patternCounts[0] === 3 && patternCounts[1] === 2) {
      type = "Full house";
    } else if (patternCounts[0] === 3) {
      type = "Three of a kind";
    } else if (patternCounts[0] === 2 && patternCounts[1] === 2) {
      type = "Two pair";
    } else if (patternCounts[0] === 2) {
      type = "One pair";
    }

    return { type, originalCards: cardsArray, jokerReplacedHand };
  }

  private compareHands(
    a: { hand: Hand; bid: number },
    b: { hand: Hand; bid: number }
  ): number {
    const typeDiff =
      this.handTypes[b.hand.type as keyof typeof this.handTypes] -
      this.handTypes[a.hand.type as keyof typeof this.handTypes];
    if (typeDiff !== 0) return typeDiff;

    // If types are the same, compare based on individual card strengths
    for (let i = 0; i < a.hand.jokerReplacedHand.length; i++) {
      const cardA = a.hand.jokerReplacedHand[i];
      const cardB = b.hand.jokerReplacedHand[i];
      if (cardA !== cardB) {
        const diff =
          this.cardStrength[cardB as keyof typeof this.cardStrength] -
          this.cardStrength[cardA as keyof typeof this.cardStrength];
        return diff;
      }
    }
    return 0;
  }

  private compareHandsForPartTwo(
    a: { hand: Hand; bid: number },
    b: { hand: Hand; bid: number }
  ): number {
    const typeDiff =
      this.handTypes[b.hand.type as keyof typeof this.handTypes] -
      this.handTypes[a.hand.type as keyof typeof this.handTypes];
    if (typeDiff !== 0) return typeDiff;

    // If types are the same, compare based on individual card strengths
    for (let i = 0; i < a.hand.originalCards.length; i++) {
      const cardA = a.hand.originalCards[i];
      const cardB = b.hand.originalCards[i];
      if (cardA !== cardB) {
        const diff =
          this.cardStrengthForPartTwo[
            cardB as keyof typeof this.cardStrengthForPartTwo
          ] -
          this.cardStrengthForPartTwo[
            cardA as keyof typeof this.cardStrengthForPartTwo
          ];
        return diff;
      }
    }
    return 0;
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    let hands = lines.map((line) => {
      const [handStr, bidStr] = line.split(" ");
      const hand = this.classifyHand(handStr);
      return { hand, bid: parseInt(bidStr, 10) };
    });

    hands.sort((a, b) => this.compareHands(a, b)).reverse();

    // Calculate total winnings
    let totalWinnings = 0;
    const totalHands = hands.length;
    hands.forEach((hand, index) => {
      const rank = index + 1;
      totalWinnings += hand.bid * rank;
    });
    return totalWinnings.toString();
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    let hands = lines.map((line) => {
      const [handStr, bidStr] = line.split(" ");
      const hand = this.classifyHandForPartTwo(handStr);
      return { hand, bid: parseInt(bidStr, 10) };
    });

    hands.sort((a, b) => this.compareHandsForPartTwo(a, b)).reverse();

    let totalWinnings = 0;
    hands.forEach((hand, index) => {
      const rank = index + 1;
      const winnings = hand.bid * rank;
      totalWinnings += winnings;

      console.log(
        `Hand: ${hand.hand.originalCards.join(
          ""
        )}, New hand: ${hand.hand.jokerReplacedHand.join("")} Bid: ${
          hand.bid
        }, Rank: ${rank}, Winnings: ${winnings}`
      );
    });

    return totalWinnings.toString();
  }
}

export default new Day7();
