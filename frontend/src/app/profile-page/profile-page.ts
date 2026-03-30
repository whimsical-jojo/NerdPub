import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { GameSession, GameSessionBooking } from '../model/entities';
import { GameSessionsList } from '../game-sessions-list/game-sessions-list';
import { MatButtonModule } from '@angular/material/button';
import { BookingStore } from '../injectables/session-booking-store';
import { MatDialog } from '@angular/material/dialog';
import { MemberForm } from '../member-form/member-form';
import { ChangePasswordForm } from '../change-password-form/change-password-form';

@Component({
  selector: 'app-profile-page',
  imports: [GameSessionsList, MatButtonModule],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.css',
})
export class ProfilePage {
  private bookingStore = inject(BookingStore);
  private dialog = inject(MatDialog);
  bookings = signal<GameSessionBooking[]>([]);

  gameSessions = computed(() =>
    this.bookingStore.bookings().map(x => x.session)
  );
  
  openEditProfile(): void {
    this.dialog.open(MemberForm, {
      width: '500px',
      maxWidth: '95vw',
      data: { mode: 'edit' }
    });
  }

  changePassword(): void {
    this.dialog.open(ChangePasswordForm, {
      width: '400px',
      maxWidth: '95vw'
    });
  }
}

