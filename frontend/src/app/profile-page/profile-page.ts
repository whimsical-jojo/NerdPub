import { Component, signal } from '@angular/core';
import { GameSession } from '../model/entities';
import { GameSessionsList } from '../game-sessions-list/game-sessions-list';

@Component({
  selector: 'app-profile-page',
  imports: [GameSessionsList],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  gameSessions = signal<GameSession[]>([]);

}
