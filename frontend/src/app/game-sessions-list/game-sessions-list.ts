import { Component, inject, OnInit, signal } from '@angular/core';
import { GameSessionPreview } from '../game-session-preview/game-session-preview';
import { GameSessionService } from '../service/game-session-service';
import { GameSession } from '../model/entities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-sessions-list',
  imports: [GameSessionPreview,FormsModule,CommonModule],
  templateUrl: './game-sessions-list.html',
  styleUrl: './game-sessions-list.css',
})
export class GameSessionsList implements OnInit{
  gameSessions=signal<GameSession[]>([]);
  gameService=inject(GameSessionService);
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
