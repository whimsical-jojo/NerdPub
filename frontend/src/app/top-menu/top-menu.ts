import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from '../login/login';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './top-menu.html',
  styleUrl: './top-menu.css',
})
export class TopMenu {
  private dialog = inject(MatDialog);
  authService = inject(AuthService);
  router = inject(Router);


  login() {
    this.dialog.open(LoginComponent, {
      width: '450px', // Puoi regolare la larghezza
      autoFocus: true,
    });
  }

  logout() {
    this.authService.logout();
  }
}
