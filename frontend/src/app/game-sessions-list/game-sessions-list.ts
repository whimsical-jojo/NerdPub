import { Component, inject, input, OnInit, signal } from '@angular/core';
import { GameSessionPreview } from '../game-session-preview/game-session-preview';
import { GameSessionService } from '../service/game-session-service';
import { GameSession } from '../model/entities';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GameSessionBookingService } from '../service/game-session-booking-service';
import { AuthService } from '../service/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login';
import { BookingStore } from '../injectables/session-booking-store';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-game-sessions-list',
  imports: [GameSessionPreview, FormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './game-sessions-list.html',
  styleUrl: './game-sessions-list.css',
})
export class GameSessionsList {
  private bookingService = inject(GameSessionBookingService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private bookingStore = inject(BookingStore);
  private snackBar = inject(MatSnackBar);


  //The gameSessions that the list will display should be inputed from the parent component
  gameSessions = input.required<GameSession[]>();

  //Helper: check if booked
  isSessionBooked(sessionId: number | undefined): boolean {
    if (!sessionId) return false;
    return this.bookingStore.bookedSessionIds().includes(sessionId);
  }

  //Handle child event
  handleAction(event: { session: GameSession; action: 'book' | 'cancel' }) {
    console.log("Called the handling function for the event!");
    if (!this.authService.isLoggedIn()) {
      this.dialog.open(LoginComponent, {
        width: '420px',
        maxWidth: '95vw',
        panelClass: 'login-dialog-panel',
        autoFocus: 'dialog',
      });
      return;
    }

    console.log("Booked spots before:" + event.session.bookedSpots);
    const sessionId = event.session.id!;

    if (event.action === 'book') {
      this.bookingService.bookGameSession(sessionId).subscribe({
        next: response => {
          event.session.bookedSpots = response.session.bookedSpots;
          console.log("Booked spots after:" + event.session.bookedSpots);
          this.bookingStore.addBooking(response);
        },
        error: err => {
          const msg = err.error || 'Errore durante la prenotazione';
          this.snackBar.open(msg, 'Chiudi', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar'] // You can style this in CSS
          });
        }
      });

    } else {
      this.bookingService.cancelBooking(sessionId).subscribe({
        next: () => {
          console.log('Booking cancelled');
          //console.log("Booked spots after:" + booking.session.bookedSpots);
          event.session.bookedSpots--;
          this.bookingStore.removeBooking(sessionId);
        },
        error: err => console.error('Cancel failed', err)
      });
    }
  }
}
