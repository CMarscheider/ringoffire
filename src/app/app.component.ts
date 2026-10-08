import { Component, inject } from '@angular/core';
import { DocumentData, Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ringoffire';
  firestore: Firestore = inject(Firestore);
  items$: Observable<DocumentData[]>;

  constructor() {
    const aCollection = collection(this.firestore, 'items');
    this.items$ = collectionData(aCollection);
  }
}
