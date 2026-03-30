import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { Member } from '../model/entities';
import { BookingStore } from '../injectables/session-booking-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  //TODO set this up so refreshing the page doesn't fuck up everything
  private apiURL = 'http://localhost:8080/api/account';
  private tokenKey = 'id_token';
  http = inject(HttpClient);
  private _currentUser = signal<Member | null>(null);
  currentUser = this._currentUser.asReadonly();
  bookingStore = inject(BookingStore);


  login(username: string, password: string) {
    //Maybe I can change this at a later date to have only one post
    console.log("Login called!");
    let obs: Observable<Member> = this.http.post<any>(this.apiURL + '/login', { username, password })
      .pipe(
        tap(response => {
          console.log(response);
          this.storeToken(response.token);
        }),
        switchMap(() => {
          return this.setCurrentUser();
        })
      );
    return obs;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this._currentUser.set(null);
    //Brute force it is
    window.location.reload();
  }

  //TODO fix this later
  isLoggedIn(): boolean {
    console.log('TOKEN:', localStorage.getItem(this.tokenKey));
    return localStorage.getItem(this.tokenKey) !== null;
  }

  //TODO complete this crap
  register(user: Member) {
    return this.http.post<Member>(this.apiURL, user)
      .pipe()
  }

  private storeToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  private retrieveToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setCurrentUser(): Observable<Member> {
    return this.http.get<Member>(this.apiURL + '/current-user')
      .pipe(
        tap(user => {
          console.log("Setting current user based on jwt");
          
          user.dob = this.parseLocalDate(user.dob as unknown as string)!;
          console.log(user);
          //Sets the user boking ids whenever the user is set so that we know what is actually booked.
          this.bookingStore.loadUserBookings();
          this._currentUser.set(user);
        })
      );
  }

  parseLocalDate(localDateString: string | null): Date | null {
    if (!localDateString) return null;
    const [y, m, d] = localDateString.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
}
