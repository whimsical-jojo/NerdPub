import { Component, inject, input, OnInit, signal } from '@angular/core';
import { GameService } from '../service/game-service';
import { Game } from '../model/entities';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-game-form',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatIconModule, MatDatepickerModule
    , MatNativeDateModule, MatButtonModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.css',
})
export class GameForm {
  dialogRef = inject(MatDialogRef<GameForm>);
  private service = inject(GameService);
  
  // 1. Grab data passed from the AdminGamesComponent
  private data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'edit', game?: Game } | undefined;

  mode = signal<'create' | 'edit'>(this.data?.mode ?? 'create');

  // 2. Initialize signal with spread operator to capture all fields dynamically
  game = signal<Game>(this.data?.game 
    ? { ...this.data.game } 
    : { title: '', description: '' } as Game
  );

  // 3. Unified save logic
  save(): void {
    const gameData = this.game();
    const request$ = this.mode() === 'edit' 
      ? this.service.updateGame(gameData) 
      : this.service.createGame(gameData);

    request$.subscribe({
      next: (savedGame) => {
        console.log('Operazione riuscita:', savedGame);
        // Pass the result back to the parent so it knows to refresh the list
        this.dialogRef.close(savedGame); 
      },
      error: (err) => {
        console.error('Errore durante il salvataggio:', err);
        alert('Errore nel salvataggio del gioco!');
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

