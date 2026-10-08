import { Component, HostListener, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Game, GameData } from 'src/models/game';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

const MOBILE_BREAKPOINT = 1000;
const DESKTOP_PLAYER_TOP_OFFSET = 100;
const MOBILE_PLAYER_TOP_OFFSET = 60;
const DESKTOP_PLAYER_SPACING = 90;
const MOBILE_PLAYER_SPACING = 56;
const PICK_CARD_ANIMATION_DURATION_MS = 1000;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game: Game = new Game();
  firestore: Firestore = inject(Firestore);

  playerTopOffset = DESKTOP_PLAYER_TOP_OFFSET;
  playerSpacing = DESKTOP_PLAYER_SPACING;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  /**
   * Passt das Layout an und lädt das Spiel mit der ID aus der URL aus Firestore.
   */
  ngOnInit(): void {
    this.updateLayoutForViewport();

    this.route.params.subscribe(async (params) => {
      let docRef = doc(this.firestore, 'games', params['id']);
      docData(docRef).subscribe((game) => {
        const gameData = game as GameData;
        this.game.currentPlayer = gameData.currentPlayer;
        this.game.playedCards = gameData.playedCards;
        this.game.players = gameData.players;
        this.game.stack = gameData.stack;
      });
    });
  }

  /**
   * Setzt Abstand und Abstand zwischen den Spielern passend zur Fensterbreite.
   */
  @HostListener('window:resize')
  updateLayoutForViewport(): void {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    this.playerTopOffset = isMobile ? MOBILE_PLAYER_TOP_OFFSET : DESKTOP_PLAYER_TOP_OFFSET;
    this.playerSpacing = isMobile ? MOBILE_PLAYER_SPACING : DESKTOP_PLAYER_SPACING;
  }

  /**
   * Gibt an, ob mindestens ein Spieler vorhanden ist und eine Karte gezogen werden darf.
   */
  get canTakeCard(): boolean {
    return this.game.players.length > 0;
  }

  /**
   * Zieht die oberste Karte vom Stapel und gibt den Zug an den nächsten Spieler weiter.
   */
  takeCard(): void {
    if (!this.canTakeCard || this.pickCardAnimation) {
      return;
    }
    const card = this.game.stack.pop();
    if (card === undefined) {
      return;
    }
    this.startPickCardAnimation(card);
    this.passTurnToNextPlayer();
  }

  /**
   * Zeigt die gezogene Karte an und legt sie nach der Animation auf den Ablagestapel.
   * @param card - Name der gezogenen Karte, z. B. "hearts_5".
   */
  private startPickCardAnimation(card: string): void {
    this.currentCard = card;
    this.pickCardAnimation = true;

    setTimeout(() => {
      this.pickCardAnimation = false;
      this.game.playedCards.push(this.currentCard);
    }, PICK_CARD_ANIMATION_DURATION_MS);
  }

  /**
   * Setzt den aktuellen Spieler auf den nächsten Spieler in der Runde.
   */
  private passTurnToNextPlayer(): void {
    this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
  }

  /**
   * Öffnet den Dialog zum Hinzufügen eines Spielers und übernimmt den eingegebenen Namen.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
