import { Component, inject, OnInit, signal } from '@angular/core';
import { GameSessionsList } from "../game-sessions-list/game-sessions-list";
import { GameSession } from '../model/entities';
import { GameSessionService } from '../service/game-session-service';

@Component({
  selector: 'app-home-page',
  imports: [GameSessionsList],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit{
  gameSessions=signal<GameSession[]>([]);
  service=inject(GameSessionService);

  ngOnInit(): void {
    this.service.getGameSessions('Bologna').subscribe({
      next: (sessions) => {
        console.log(sessions);
        this.gameSessions.set(sessions)},
      error: (err) => console.error('Error fetching game sessions:', err)
    });
  }
}
