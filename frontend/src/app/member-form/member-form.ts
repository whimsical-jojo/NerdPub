import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member } from '../model/entities';
import { AccountManagementService } from '../service/account-management-service';
import { AuthService } from '../service/auth-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-member-form',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatIconModule, MatDatepickerModule
    , MatNativeDateModule, MatButtonModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './member-form.html',
  styleUrl: './member-form.css',
})
export class MemberForm implements OnInit {

  private service = inject(AccountManagementService);
  private authService = inject(AuthService);
  dialogRef = inject(MatDialogRef<MemberForm>);
  private data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'edit' } | undefined;

  mode = signal<'create' | 'edit'>(this.data?.mode ?? 'create');

  //internal state as signal
  member = signal<Member>({
    firstName: '',
    lastName: '',
    username: '',
    dob: new Date()
  });

  ngOnInit() {
    //Now it reacts to mode changes and can be used to update and create users.
    if (this.mode() === 'edit') {
      const user = this.authService.currentUser();
      console.log(typeof user?.dob);

      if (user) {
        this.member.set({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          dob: new Date(user.dob)
        });
      }
    }
  }

  /**
   * Creates a new user in the db. Only Admins can do this.
   */
  create(): void {
    this.service.register(this.member()).subscribe({
      next: (member) => {
        console.log('Account creato con successo!', member);

        this.member.set({
          firstName: '',
          lastName: '',
          username: '',
          dob: new Date()
        });
      },
      error: (err) => {
        console.error("Errore nella creazione dell'account", err);
      }
    });
    this.dialogRef.close();
  }

  /**
   * Updates user account details. Anyone can change their own account details.
   */
  update(): void {
    this.service.update(this.member()).subscribe({
      next: (member) => {
        console.log('Account aggiornato con successo!', member);

        // aggiorna stato locale con risposta server
        this.member.set(member);
      },
      error: (err) => {
        console.error("Errore nell'aggiornamento dell'account", err);
      }
    });
    this.dialogRef.close();
  }
}
