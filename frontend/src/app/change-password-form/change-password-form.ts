import { Component, inject, signal } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AccountManagementService } from '../service/account-management-service';
import { AuthService } from '../service/auth-service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password-form',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './change-password-form.html',
  styleUrl: './change-password-form.css',
})
export class ChangePasswordForm {

  dialogRef = inject(MatDialogRef<ChangePasswordForm>);
  private service = inject(AccountManagementService);
  private authService = inject(AuthService);


  password = signal('');
  confirmPassword = signal('');

  save(): void {
    if (this.password() !== this.confirmPassword()) {
      alert('Le password non coincidono');
      return;
    }
    let currentUser = this.authService.currentUser()!;
    currentUser.password = this.password();

    this.service.update(
      currentUser).subscribe({
        next: (member) => {
          console.log('Password aggiornata con successo!', member);
        },
        error: (err) => {
          console.error("Errore nell'aggiornamento della password", err);
        }
      });

    this.dialogRef.close(true);
  }
}
