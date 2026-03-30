import { Component, inject, OnInit, signal } from '@angular/core';
import { GameSessionsList } from '../game-sessions-list/game-sessions-list';
import { GameSession } from '../model/entities';
import { GameSessionService } from '../service/game-session-service';
import { CommonModule } from '@angular/common';
import { CityPicker } from '../city-picker/city-picker';

@Component({
  selector: 'app-home-page',
  imports: [GameSessionsList, CommonModule, CityPicker],
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
})
export class HomePage implements OnInit {
  gameSessions = signal<GameSession[]>([]);
  /** Legato a CityPicker con [(city)] — deve essere una stringa, non un Signal. */
  searchCity = '';

  private fetchTimer?: ReturnType<typeof setTimeout>;
  service = inject(GameSessionService);

  ngOnInit(): void {
    this.fetchGameSessions();
  }

  /**
   * Aggiorna sempre searchCity prima del fetch (con [(city)] + (cityChange) il padre
   * poteva chiamare il servizio con la città ancora vecchia).
   */
  onCityChange(city: string): void {
    this.searchCity = typeof city === 'string' ? city : '';
    clearTimeout(this.fetchTimer);
    this.fetchTimer = setTimeout(() => this.fetchGameSessions(), 350);
  }

  fetchGameSessions(): void {
    this.service.getGameSessions(this.searchCity ?? '').subscribe({
      next: (sessions) => this.gameSessions.set(sessions),
      error: (err) => {
        console.error('Error fetching game sessions:', err);
        this.gameSessions.set([]);
      },
    });
  }
}
