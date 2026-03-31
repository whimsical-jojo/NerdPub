import { inject, Injectable, signal } from '@angular/core';
import { GameSessionBookingService } from '../service/game-session-booking-service';
import { GameSessionBooking } from '../model/entities';

@Injectable({ providedIn: 'root' })
export class BookingStore {

  private bookingService = inject(GameSessionBookingService);

  bookings = signal<GameSessionBooking[]>([]);
  bookedSessionIds = signal<number[]>([]);

  loadUserBookings() {
    this.bookingService.getUserBookings().subscribe(bookings => {
      this.bookings.set(bookings);
      this.bookedSessionIds.set(bookings.map(x => x.session.id!));
    });
  }

  addBooking(booking: GameSessionBooking) {
    this.bookings.update(bookings => [...bookings, booking]);
    this.bookedSessionIds.update(ids => [...ids, booking.session.id!]);
  }

  removeBooking(booking: GameSessionBooking): void;
  removeBooking(id: number): void;
  removeBooking(param: GameSessionBooking | number): void {
    this.bookings.update(bookings =>
      bookings.filter(x =>
        typeof param === "number"
          ? x.session.id !== param
          : x !== param
      )
    );
    this.bookedSessionIds.update(ids =>
      ids.filter(x =>
        typeof param === "number"
          ? x !== param
          : x !== param.session.id
      )
    );
  }
}