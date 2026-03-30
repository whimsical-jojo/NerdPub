import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameSessionBooking } from '../model/entities';

@Injectable({
  providedIn: 'root',
})
export class GameSessionBookingService {
  http=inject(HttpClient);
  url = 'http://localhost:8080/api/bookings';

// POST /bookings/{id} — creazione prenotazione di sessione gioco
 bookGameSession(sessionId : number):Observable<GameSessionBooking>{
  return this.http.post<GameSessionBooking>(this.url,sessionId);
 }

 //This cancels the booking FOR THE CURRENT USER (derived from the authentication in the backend)
 // DELETE /bookings/{id} — cancellazione prenotazione di sessione gioco
 cancelBooking(sessionId: number) {
    return this.http.delete<void>(this.url+'/'+sessionId);
  }

  getUserBookings() {
    console.log("Getting user bookings");
    return this.http.get<GameSessionBooking[]>(this.url+'/user-bookings');
  }
}
