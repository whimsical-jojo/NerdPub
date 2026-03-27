import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameSessionsList } from './game-sessions-list/game-sessions-list';
import { HomePage } from "./home-page/home-page";
import { AuthService } from './service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameSessionsList, HomePage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  authService = inject(AuthService);

  ngOnInit() {
    const token = localStorage.getItem('id_token');
    //TODO check if I need to do something else if the token is expired or invalid
    if (token) {
      try {
        this.authService.setCurrentUser().subscribe();
      } catch (e) {
        console.error(e);
        this.authService.logout();
      }
    } 
  }
}
