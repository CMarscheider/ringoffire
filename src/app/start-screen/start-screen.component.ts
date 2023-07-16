import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { Game } from 'src/models/game';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'],
})
export class StartScreenComponent implements OnInit {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  ngOnInit(): void {}

  newGame() {
    let newGame = new Game();
    const collRef = collection(this.firestore, 'games');
    console.log(newGame);
    addDoc(collRef, newGame.toJson()).then((game) =>
      this.router.navigateByUrl('/game/' + game.id)
    );
  }
}
