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

@Component({
  selector: 'app-game-sessions-list',
  imports: [GameSessionPreview,FormsModule,CommonModule],
  templateUrl: './game-sessions-list.html',
  styleUrl: './game-sessions-list.css',
})
export class GameSessionsList{
  private bookingService = inject(GameSessionBookingService);
  private authService = inject(AuthService);
  private dialog = inject(MatDialog);
  private bookingStore = inject(BookingStore);

  //The gameSessions that the list will display should be inputed from the parent component
  gameSessions=input.required<GameSession[]>();

  //Helper: check if booked
  isSessionBooked(sessionId: number | undefined): boolean {
    if (!sessionId) return false;
    return this.bookingStore.bookedSessionIds().includes(sessionId);
  }

  //Handle child event
  handleAction(event: { session: GameSession; action: 'book' | 'cancel' }) {
    console.log("Called the handling function for the event!");
    if (!this.authService.isLoggedIn()) {
      this.dialog.open(LoginComponent, { width: '400px' });
      return;
    }

    const sessionId = event.session.id!;
    
    if (event.action === 'book') {
      this.bookingService.bookGameSession(sessionId).subscribe({
        next: () => {
          console.log('Booking successful');
          //Updates 
          this.bookingStore.addBooking(sessionId);
        },
        error: err => console.error('Booking failed', err)
      });

    } else {
      this.bookingService.cancelBooking(sessionId).subscribe({
        next: () => {
          console.log('Booking cancelled');

          this.bookingStore.removeBooking(sessionId);
        },
        error: err => console.error('Cancel failed', err)
      });
    }
  }
}
