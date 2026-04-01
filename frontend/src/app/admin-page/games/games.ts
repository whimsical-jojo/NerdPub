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
import { combineLatest, debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs';
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

  private gameService = inject(GameService);
  private dialog = inject(MatDialog);

  search = signal<string>('');
  private refreshTrigger = signal<number>(0); 

  // Combined stream: reacts to search typing OR manual refresh triggers
  games = toSignal(
    combineLatest([
      toObservable(this.search).pipe(debounceTime(300), startWith('')),
      toObservable(this.refreshTrigger)
    ]).pipe(
      switchMap(([term]) => this.gameService.search(term))
    ),
    { initialValue: [] as Game[] }
  );

  // One function for both Create and Edit
  openGameForm(game?: Game) {
    const dialogRef = this.dialog.open(GameForm, {
      width: '500px',
      maxWidth: '95vw',
      data: { 
        mode: game ? 'edit' : 'create',
        game: game // Pass the object for editing
      }
    });

    // CRITICAL: Listen for the result and bump the trigger
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.refreshTrigger.update(n => n + 1);
      }
    });
  }

  deleteGame(id: number) {
    this.gameService.deleteGame(id).subscribe({
      next: () => {
        this.refreshTrigger.update(n => n + 1);
      },
      error: (err) => console.error('Failed to delete game', err)
    });
  }
}
