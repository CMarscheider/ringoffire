# Ring of Fire

Eine Web-Umsetzung des Kartenspiels "Ring of Fire" (auch bekannt als "Ich hab noch nie") für mehrere Spieler:innen auf einem Gerät. Karten werden nacheinander aufgedeckt, jede Zahl löst eine eigene Spielregel aus.

**Live-Demo:** https://ring-of-fire-cm-ea6ac.web.app

## Features

- Spieler:innen hinzufügen und verwalten
- Karten nacheinander aufdecken, animierte Kartenanzeige
- Regel-Anzeige pro gezogener Karte
- Spielstand wird in Firebase Firestore persistiert

## Tech-Stack

- [Angular](https://angular.io/) 16 (Standalone Components, Routing)
- [Angular Material](https://material.angular.io/) für UI-Komponenten
- [Firebase](https://firebase.google.com/) / Firestore für den Spielzustand
- Firebase Hosting für das Deployment

## Lokal starten

```bash
npm install
ng serve
```

Anschließend im Browser `http://localhost:4200` öffnen.

## Tests

```bash
ng test
```
