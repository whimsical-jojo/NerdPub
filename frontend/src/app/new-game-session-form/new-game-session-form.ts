import { Component, inject, OnInit, signal } from '@angular/core';
import { GameSessionService } from '../service/game-session-service';
import { Game, GameSession, Pub, PubTable } from '../model/entities';
import { GameService } from '../service/game-service';
import { PubTableService } from '../service/pub-table-service';
import { FormsModule } from '@angular/forms';
import { PubService } from '../service/pub-service';

@Component({
  selector: 'app-new-game-session-form',
  imports: [FormsModule],
  templateUrl: './new-game-session-form.html',
  styleUrl: './new-game-session-form.css',
})
export class NewGameSessionForm implements OnInit{
  service=inject(GameSessionService);
  
  gameService=inject(GameService);
  tableService=inject(PubTableService);
  games=signal<Game[]>([]);
  tables=signal<PubTable[]>([]);

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
   gameId:0,
   tableId:0,
   date:new Date()
  }

  ngOnInit():void{
    this.gameService.getGames().subscribe({
      next: (games) => {
        this.games.set(games);
      },
      error:(error)=>{
        console.log(error);
      }}
    );
    this.tableService.getPubTables().subscribe({
      next: (tables) => {
        this.tables.set(tables);
      },
      error:(error)=>{
        console.log(error);
      }}
    );

  }

  onTableChange(selectedTable: any) {
      if (selectedTable && selectedTable.pub) {
          // Se l'oggetto table ha il pub annidato
          this.newGameSession.table.pubId = selectedTable.pub.id;
          
          // Oppure, se pubId è una proprietà diretta di table:
          // this.newGameSession.table.pubId = selectedTable.pubId;
      }
      if(selectedTable){
        this.newGameSession.tableId=selectedTable.id;
      }
  }

  onGameChange(selectedGame: any) {
    if(selectedGame){
      this.newGameSession.gameId=selectedGame.id;
    }
  }

  save():void{
    this.service.createGameSession(this.newGameSession).subscribe({
    next: (gameSession) => {
        console.log('Sessione di gioco salvato con successo!', gameSession);
        alert('Sessione di gioco salvato con successo!');
         this.newGameSession={
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
            gameId:0,
            tableId:0,
            date:new Date()
            }
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio della sessione di gioco!', err);
        alert('Errore nel salvataggio della sessione di gioco!');
      }
    });  
  }
}
