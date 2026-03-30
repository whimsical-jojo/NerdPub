import { Component, inject, OnInit, signal } from '@angular/core';
import { HomePage } from './home-page/home-page';
import { AuthService } from './service/auth-service';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HomePage, RouterOutlet],
=======
import { TopMenu } from "./top-menu/top-menu";

@Component({
  selector: 'app-root',
  imports: [HomePage, TopMenu],
>>>>>>> e4d5a8fd9e3a30c257ad4f141c1beebd751138ac
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
