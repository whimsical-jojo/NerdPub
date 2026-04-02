import { Component, inject, model, OnInit, signal } from '@angular/core';
import { GameSessionsList } from '../game-sessions-list/game-sessions-list';
import { Game, GameSession } from '../model/entities';
import { GameSessionService } from '../service/game-session-service';
import { CommonModule } from '@angular/common';
import { CityPicker } from '../city-picker/city-picker';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { MatSlider, MatSliderModule } from "@angular/material/slider";
import { MatIcon } from "@angular/material/icon";
import { GamePicker } from '../game-picker/game-picker';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home-page',
  imports: [GameSessionsList, CommonModule, CityPicker, FormsModule, MatFormFieldModule, MatLabel, MatSliderModule, MatIcon, GamePicker,
    MatButtonModule
  ],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage{
  gameSessions = signal<GameSession[]>([]); // sessions to display
  city = model<string>('');
  selectedGame = model<Game | null>(null);
  daysAhead = model<number>(0);
  searchPerformed = false;                // track if search has been done

  service = inject(GameSessionService);

  searchSessions() {
  const city = this.city().trim();
  const game = this.selectedGame() ? this.selectedGame()!.title : '';
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
