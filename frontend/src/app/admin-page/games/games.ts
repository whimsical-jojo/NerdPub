import { Component, inject, signal } from '@angular/core';
import { MemberService } from '../../service/member-service';
import { MatDialog } from '@angular/material/dialog';
import { GameForm } from '../../game-form/game-form';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Game } from '../../model/entities';
import { GameService } from '../../service/game-service';

@Component({
  selector: 'app-games',
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class AdminGamesComponent {
  gameService = inject(GameService);
  dialog = inject(MatDialog);

  search = signal<string>('');

    //YEAH the AI fixed this one so it did what I actually wanted //YEAH the AI fixed this one so it did what I actually wanted
    // 1. Create a trigger signal
    private refreshTrigger = signal<number>(0); 
    games = toSignal(
    // 2. Combine the search term AND the trigger
    combineLatest([
      toObservable(this.search).pipe(debounceTime(300), distinctUntilChanged()),
      toObservable(this.refreshTrigger)
    ]).pipe(
      // Whenever either changes, re-run the search
      switchMap(([term]) => this.gameService.search(term))
    ),
    { initialValue: [] as Game[] }
  );


   openMemberForm() {
      this.dialog.open(GameForm, {
        width: '500px',
        maxWidth: '95vw',
        data: { mode: 'create' }
      });
    }
}
