import { Component, HostListener, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {
  Firestore,
  doc,
  collection,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

const MOBILE_BREAKPOINT = 1000;

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

  playerTopOffset = 100;
  playerSpacing = 90;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateLayoutForViewport();

    this.route.params.subscribe(async (params) => {
      let docRef = doc(this.firestore, 'games', params['id']);
      docData(docRef).subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
    });
  }

  @HostListener('window:resize')
  updateLayoutForViewport() {
    const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
    this.playerTopOffset = isMobile ? 60 : 100;
    this.playerSpacing = isMobile ? 56 : 90;
  }

  get canTakeCard(): boolean {
    return this.game.players.length > 0;
  }

  takeCard() {
    if (!this.canTakeCard) {
      return;
    }
    if (!this.pickCardAnimation) {
      let card = this.game.stack.pop();
      if (card !== undefined) {
        this.currentCard = card;
        this.pickCardAnimation = true;

        this.game.currentPlayer++;
        this.game.currentPlayer =
          this.game.currentPlayer % this.game.players.length;

        setTimeout(() => {
          this.pickCardAnimation = false;
          this.game.playedCards.push(this.currentCard);
        }, 1000);
      }
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
