import { inject, Injectable, signal } from '@angular/core';
import { GameSessionBookingService } from '../service/game-session-booking-service';
import { GameSessionBooking } from '../model/entities';

@Injectable({ providedIn: 'root' })
export class BookingStore {

  private bookingService = inject(GameSessionBookingService);

  bookings = signal<GameSessionBooking[]>([]);
  bookedSessionIds = signal<number[]>([]);

  //TODO for the user page make it so this grabs all the bookings instead of just the bookings.
  loadUserBookings() {
    this.bookingService.getUserBookings().subscribe(bookings => {
      console.log("These are the bookings:");
      console.log(bookings);
      this.bookings.set(bookings);
    });
  }

  addBooking(booking: GameSessionBooking) {
    this.bookings.update(bookings => [...bookings, booking]);
  }

  removeBooking(booking: GameSessionBooking): void;
  removeBooking(id: number): void;
  removeBooking(param: GameSessionBooking | number): void {
    this.bookings.update(bookings =>
      bookings.filter(x =>
        typeof param === "number"
          ? x.id !== param
          : x !== param
      )
    );
  }
}