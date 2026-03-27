import { Component, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../service/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatDialogModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {

  username = signal<string>("");
  password = signal<string>("");
  errorMessage = signal<string>("");
  authService: AuthService = inject(AuthService);

  constructor (private dialogRef: MatDialogRef<LoginComponent>) {

  }

  router = inject(Router);

  onSubmit() {
    this.authService.login(this.username(), this.password())
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          this.errorMessage.set('Invalid username or password');
        }
      });
  }
}
