import { Component, inject } from '@angular/core';
import { MemberForm } from '../member-form/member-form';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordForm } from '../change-password-form/change-password-form';

import { NewPubForm } from '../new-pub-form/new-pub-form';
import { NewGameSessionForm } from '../new-game-session-form/new-game-session-form';
import { NewTableForm } from '../new-table-form/new-table-form';
import { NewGameForm } from '../new-game-form/new-game-form';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-admin-page',
  imports: [NewPubForm,MemberForm,NewGameSessionForm,NewPubForm,NewTableForm,NewGameForm,MatTabsModule],
  templateUrl: './admin-page.html',
  styleUrl: './admin-page.css',
})
export class AdminPage {
   private dialog = inject(MatDialog);
   openEditProfile(): void {
      this.dialog.open(MemberForm, {
        width: '500px',
        maxWidth: '95vw',
        data: { mode: 'edit' }
      });
    }
  
    changePassword(): void {
      this.dialog.open(ChangePasswordForm, {
        width: '400px',
        maxWidth: '95vw'
      });
    }
}
