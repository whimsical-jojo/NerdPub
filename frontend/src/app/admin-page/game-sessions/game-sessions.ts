import { Component, inject, signal } from '@angular/core';
import { GameSessionService } from '../../service/game-session-service';
import { MatDialog } from '@angular/material/dialog';
import { GameSession } from '../../model/entities';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CityPicker } from '../../city-picker/city-picker';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SessionForm } from './session-form/session-form';

@Component({
  selector: 'app-game-sessions',
  imports: [MatSliderModule, MatButtonModule, MatIconModule, CityPicker, MatCardModule, FormsModule, DatePipe],
  templateUrl: './game-sessions.html',
  styleUrl: './game-sessions.css',
})
export class AdminSessionsComponent {
  private sessionService = inject(GameSessionService);
  private dialog = inject(MatDialog);

  // Search Filters
  selectedCity = signal<string>('');
  daysAhead = signal<number>(7); // Default to a week
  
  // Results
  sessions = signal<GameSession[]>([]);

  search() {
    // We pass the current values of our signals to the service
    this.sessionService.searchGameSessions(
      undefined,           // game (not used in header for now)
      this.daysAhead(),    // days
      this.selectedCity() ?? '' // city
    ).subscribe({
      next: (results) => this.sessions.set(results),
      error: (err) => console.error('Search failed', err)
    });
  }

  openSessionForm(session?: GameSession) {
    const ref = this.dialog.open(SessionForm, {
      width: '600px',
      data: { session }
    });

    ref.afterClosed().subscribe(result => {
      if (result) this.search(); // Refresh list if saved
    });
  }

  deleteSession(session : GameSession) {
    const id = session.id;
    if (!id) return;
    this.sessionService.deleteGameSession(id).subscribe({
      next: () => this.search(),
      error: (err) => console.error('Delete failed', err)
    });
  }
}