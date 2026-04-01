import { Component, inject, OnInit, signal } from '@angular/core';
import { HomePage } from './home-page/home-page';
import { AuthService } from './service/auth-service';
import { TopMenu } from "./top-menu/top-menu";
import { RouterOutlet } from '@angular/router';
import { ProfilePage } from './profile-page/profile-page';
import { AdminPage } from './admin-page/admin-page';

@Component({
  selector: 'app-root',
  imports: [ TopMenu, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('NerdPub');

  authService = inject(AuthService);

  ngOnInit(): void {
    const token = localStorage.getItem('id_token');
    // TODO check if I need to do something else if the token is expired or invalid
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
