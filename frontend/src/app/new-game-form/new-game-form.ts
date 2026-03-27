import { Component, inject, signal } from '@angular/core';
import { GameService } from '../service/game-service';
import { Game } from '../model/entities';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-game-form',
  imports: [FormsModule],
  templateUrl: './new-game-form.html',
  styleUrl: './new-game-form.css',
})
export class NewGameForm {
  service=inject(GameService);
  newGame:Game={
    title:'',
    description:''
  };

  save():void{
    this.service.createGame(this.newGame).subscribe({
    next: (game) => {
        console.log('Gioco salvato con successo!', game);
        this.newGame = {
          title: '',
          description: ''
        };
        alert('Gioco salvato con successo!');
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio del gioco!', err);
        alert('Errore nel salvataggio del gioco!');
      }
    });  
  }
}

