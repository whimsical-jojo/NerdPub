import { inject, Injectable, signal } from '@angular/core';
import { GameSessionBookingService } from '../service/game-session-booking-service';

@Injectable({ providedIn: 'root' })
export class BookingStore {

  private bookingService = inject(GameSessionBookingService);

  bookedSessionIds = signal<number[]>([]);

  loadUserBookings() {
    this.bookingService.getUserBookings().subscribe(ids => {
      console.log("These are the ids:");
      console.log(ids);
      this.bookedSessionIds.set(ids);
    });
  }

  addBooking(id: number) {
    this.bookedSessionIds.update(ids => [...ids, id]);
  }

  removeBooking(id: number) {
    this.bookedSessionIds.update(ids =>
      ids.filter(x => x !== id)
    );
  }
}