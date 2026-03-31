import { Component, inject, model, OnInit, signal } from '@angular/core';
import { GameSessionsList } from '../game-sessions-list/game-sessions-list';
import { GameSession } from '../model/entities';
import { GameSessionService } from '../service/game-session-service';
import { CommonModule } from '@angular/common';
import { CityPicker } from '../city-picker/city-picker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  imports: [GameSessionsList, CommonModule, CityPicker, FormsModule],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage implements OnInit {
  gameSessions = signal<GameSession[]>([]); // sessions to display
  searchCity = model<string>('');
  searchPerformed = false;                // track if search has been done

  service = inject(GameSessionService);

  ngOnInit(): void {
    // Do NOT fetch anything by default
  }

  searchSessions() {
    const query = this.searchCity().trim();
    if (!query) {
      this.gameSessions.set([]);
      this.searchPerformed = true;
      return;
    }

    // Fetch sessions from service by city
    this.service.getGameSessions(query).subscribe({
      next: (sessions) => {
        this.gameSessions.set(sessions);
        this.searchPerformed = true;
      },
      error: (err) => {
        console.error('Error fetching game sessions:', err);
        this.gameSessions.set([]);
        this.searchPerformed = true;
      }
    });
  }
}
