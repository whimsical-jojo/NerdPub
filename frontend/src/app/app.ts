import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSessionsList } from './game-sessions-list/game-sessions-list';
import { HomePage } from "./home-page/home-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameSessionsList, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
