import { Component, inject, signal } from '@angular/core';
import { Member } from '../../model/entities';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../service/member-service';
import { MemberForm } from '../../member-form/member-form';
import { MatDialog } from '@angular/material/dialog';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';


@Component({
  selector: 'app-members',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './members.html',
  styleUrl: './members.css',
})
export class AdminMembersComponent {

  memberService = inject(MemberService);
  dialog = inject(MatDialog);

  search = signal<string>('');
  //YEAH the AI fixed this one so it did what I actually wanted
  // 1. Create a trigger signal
  private refreshTrigger = signal<number>(0); 

  members = toSignal(
    // 2. Combine the search term AND the trigger
    combineLatest([
      toObservable(this.search).pipe(debounceTime(300), distinctUntilChanged()),
      toObservable(this.refreshTrigger)
    ]).pipe(
      // Whenever either changes, re-run the search
      switchMap(([term]) => this.memberService.searchMembers(term))
    ),
    { initialValue: [] as Member[] }
  );

  toggleBan(member: Member) {
    this.memberService.toggleBan(member.id!).subscribe({
      next: (updatedMember) => {
        // 3. Increment the trigger to force the 'members' signal to re-fetch
        this.refreshTrigger.update(n => n + 1);
        console.log('User status updated', updatedMember);
      },
      error: (err) => console.error('Failed to toggle ban', err)
    });
  }


  openMemberForm() {
    this.dialog.open(MemberForm, {
      width: '500px',
      maxWidth: '95vw',
      data: { mode: 'create' }
    });
  }
}
