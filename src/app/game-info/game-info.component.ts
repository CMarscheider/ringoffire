import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss'],
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction =  [
    { title: "Waterfall", description: "Everyone starts drinking, and no one can stop until the player who drew the card stops." },
    { title: "You", description: "The player who drew the card chooses someone to drink." },
    { title: "Me", description: "The player who drew the card drinks." },
    { title: "Floor", description: "Everyone must touch the floor, and the last person to do so drinks." },
    { title: "Guys", description: "All male players drink." },
    { title: "Chicks", description: "All female players drink." },
    { title: "Heaven", description: "Everyone must reach towards the sky, and the last person to do so drinks." },
    { title: "Mate", description: "The player who drew the card chooses someone to be their drinking buddy. Whenever the player drinks, the drinking buddy must also drink." },
    { title: "Rhyme", description: "The player who drew the card says a word, and the next player must say a word that rhymes with it. This continues until someone fails to come up with a rhyme and drinks." },
    { title: "Categories", description: "The player who drew the card chooses a category (e.g., car brands, movie titles), and each player must name something that falls within that category. The first player who fails to come up with a valid answer drinks." },
    { title: "Never Have I Ever", description: "The player who drew the card starts a 'Never Have I Ever' statement (e.g., 'Never have I ever gone skinny dipping'). Everyone who has done the action mentioned in the statement drinks." },
    { title: "Question Master", description: "The player who drew the card becomes the Question Master. They can ask any player a question, and that player must respond with another question directed at someone else. If a player fails to respond with a question or hesitates, they drink." },
    { title: "King's Cup", description: "Each player pours a portion of their drink into the central cup placed in the middle of the table. The player who draws the fourth King must drink the entire cup." }
  ];
  
  title: string = '';
  description: string = '';
  @Input() card: string = '';

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.card) {
      console.log('current card is:', this.card);
      let cardnumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardnumber - 1].title;
      this.description = this.cardAction[cardnumber - 1].description;
    }
  }
  constructor() {}
}
