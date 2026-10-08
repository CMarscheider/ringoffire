import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  /**
   * Initialisiert die Startseite.
   */
  ngOnInit(): void {}

  /**
   * Legt ein neues Spiel in Firestore an und öffnet die Spielseite.
   */
  newGame(): void {
    let newGame = new Game();
    const collRef = collection(this.firestore, 'games');
    console.log(newGame);
    addDoc(collRef, newGame.toJson()).then((game) =>
      this.router.navigateByUrl('/game/' + game.id)
    );
  }
}
