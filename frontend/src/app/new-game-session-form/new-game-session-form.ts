import { Component, inject, signal } from '@angular/core';
import { GameSessionService } from '../service/game-session-service';
import { Game, GameSession, PubTable } from '../model/entities';
import { GameService } from '../service/game-service';
import { PubTableService } from '../service/pub-table-service';

@Component({
  selector: 'app-new-game-session-form',
  imports: [],
  templateUrl: './new-game-session-form.html',
  styleUrl: './new-game-session-form.css',
})
export class NewGameSessionForm {
  service=inject(GameSessionService);
  gameService=inject(GameService);
  tableService=inject(PubTableService);
  gamePicker=signal<Game[]>([]);
  tablePicker=signal<PubTable[]>([]);

  ngOnint():void{
    this.gameService.getGames().subscribe({
      next: (games) => {
        this.gamePicker.set(games);
      },
      error:(error)=>{
        console.log(error);
      }}
    );
    this.tableService.getPubTables().subscribe({
      next: (tables) => {
        this.tablePicker.set(tables);
      },
      error:(error)=>{
        console.log(error);
      }}
    );
  }

  newGameSession:GameSession={
   game:{
    title:"",
    description:""
   },
   table:{
    name:"",
    capacity:0,
    available:true,
    pub:{
      name:"",
      address:"",
      city:"",
      phone:"",
      score:0
    },
    pubId:0
   },
   date:new Date()
  };


  save():void{
    this.service.createGameSession(this.newGameSession).subscribe({
    next: (gameSession) => {
        console.log('Sessione di gioco salvato con successo!', gameSession);
        this.newGameSession = {
         game:{
            title:"",
            description:""
          },
          table:{
            name:"",
            capacity:0,
            available:true,
            pub:{
              name:"",
              address:"",
              city:"",
              phone:"",
              score:0
            },
            pubId:0
          },
          date:new Date()
          };
        alert('Sessione di gioco salvato con successo!');
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio della sessione di gioco!', err);
        alert('Errore nel salvataggio della sessione di gioco!');
      }
    });  
  }
}
