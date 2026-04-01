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
export class GameForm implements OnInit {
  dialogRef = inject(MatDialogRef<GameForm>);
  service=inject(GameService);
  gameInput=input.required<Game>();
  private data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'edit' } | undefined;
  mode = signal<'create' | 'edit'>(this.data?.mode ?? 'create');
  
  game=signal<Game>({
    title:'',
    description:''
  });

  ngOnInit(): void {
    if (this.mode() === 'edit') {
      if(this.gameInput()){
        this.game.set({
        id:this.gameInput().id,
        title:this.gameInput().title,
        description:this.gameInput().description 
      });
      }
    
    }
  }
  create():void{
    this.service.createGame(this.game()).subscribe({
    next: (game) => {
        console.log('Gioco salvato con successo!', game);
        this.game.set(game);
        alert('Gioco salvato con successo!');
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio del gioco!', err);
        alert('Errore nel salvataggio del gioco!');
      }
    });  
  }

  update(): void {
    this.service.updateGame(this.game()).subscribe({
      next: (game) => {
        console.log('Account aggiornato con successo!', game);

        // aggiorna stato locale con risposta server
      },
      error: (err) => {
        console.error("Errore nell'aggiornamento dell'account", err);
      }
    });
    this.dialogRef.close();
  }
}

