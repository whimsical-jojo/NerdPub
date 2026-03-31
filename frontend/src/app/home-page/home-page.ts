import { Component, inject, model, OnInit, signal } from '@angular/core';
import { GameSessionsList } from '../game-sessions-list/game-sessions-list';
import { GameSession } from '../model/entities';
import { GameSessionService } from '../service/game-session-service';
import { CommonModule } from '@angular/common';
import { CityPicker } from '../city-picker/city-picker';
import { FormsModule } from '@angular/forms';
import { AdvancedSessionSearchAccordion } from "../advanced-session-search-accordion/advanced-session-search-accordion";

@Component({
  selector: 'app-home-page',
  imports: [GameSessionsList, CommonModule, CityPicker, FormsModule, AdvancedSessionSearchAccordion],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage{
  gameSessions = signal<GameSession[]>([]); // sessions to display
  city = model<string>('');
  gameTitle = model<string>('');
  daysAhead = model<number>(0);
  searchPerformed = false;                // track if search has been done

  service = inject(GameSessionService);

  searchSessions() {
  const city = this.city().trim();
  const game = this.gameTitle().trim();
  const days = this.daysAhead();

  //Avoids empty search
  if (!city && !game && !days) {
    this.gameSessions.set([]);
    this.searchPerformed = true;
    return;
  }

  this.service.searchGameSessions(
    game || undefined,
    days ?? undefined,
    city || undefined
  ).subscribe({
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
