import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../service/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatLabel,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = signal<string>('');

  private authService = inject(AuthService);
  readonly dialogRef = inject(MatDialogRef<LoginComponent>);

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.errorMessage.set('Nome utente o password non validi.');
      },
    });
  }
}
