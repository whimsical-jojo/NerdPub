import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameSession } from '../model/entities';
import { GameService } from '../service/game-service';
import { PubTableService } from '../service/pub-table-service';
import { GameSessionBookingService } from '../service/game-session-booking-service';
import { AuthService } from '../service/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login';

@Component({
  selector: 'app-game-session-preview',
  imports: [FormsModule,CommonModule],
  templateUrl: './game-session-preview.html',
  styleUrl: './game-session-preview.css',
})
export class GameSessionPreview {
  gameSession = input.required<GameSession>();
  gameService = inject(GameService);
  tableService = inject(PubTableService);
  bookingService = inject(GameSessionBookingService);
  authService = inject(AuthService);
  dialog = inject(MatDialog);

    // Evento per gestire il click sulla card (es. per aprire il dettaglio)
  onBookClick() {
    if (!this.authService.isLoggedIn()) {
      console.log("User is not logged in!");
      this.openLoginDialog();
    } else {
      console.log("User is logged in! Booking session!");
      this.bookSession();
    }
  }

  openLoginDialog() {
    console.log("Opening login dialog!");
    this.dialog.open(LoginComponent, {
      width: '400px'
    });
  }

  bookSession() {
    const sessionId : number = this.gameSession().id!;

    this.bookingService.bookGameSession(sessionId).subscribe({
      next: () => {
        console.log('Booking successful');
      },
      error: (err) => {
        console.error('Booking failed', err);
      }
    });
  }
}
