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
 bookGameSession(gameSessionBooking:GameSessionBooking):Observable<GameSessionBooking>{
  return this.http.post<GameSessionBooking>(this.url,gameSessionBooking);
 }
}
