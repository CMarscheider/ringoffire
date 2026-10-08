const CARDS_PER_SUIT = 13;

/**
 * Die Spieldaten, so wie sie in Firestore liegen.
 */
export interface GameData {
  players: string[];
  stack: string[];
  playedCards: string[];
  currentPlayer: number;
}

export class Game {
  public players: string[] = [];
  public stack: string[] = [];
  public playedCards: string[] = [];
  public currentPlayer: number = 0;

  constructor() {
    for (let rank = 1; rank <= CARDS_PER_SUIT; rank++) {
      this.stack.push('ace_' + rank, 'hearts_' + rank, 'clubs_' + rank, 'diamonds_' + rank);
    }
    shuffle(this.stack);
  }

  /**
   * Gibt die Spieldaten als einfaches Objekt zurück, das sich in Firestore speichern lässt.
   */
  public toJson(): GameData {
    return {
      players: this.players,
      stack: this.stack,
      playedCards: this.playedCards,
      currentPlayer: this.currentPlayer,
    };
  }
}

/**
 * Mischt das Array direkt (Fisher-Yates) und gibt es zurück.
 */
function shuffle(array: string[]): string[] {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
