import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game!: Game;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
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
