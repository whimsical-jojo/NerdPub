import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameSession } from '../model/entities';

@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  /**@GetMapping
    public ResponseEntity<List<GameSessionDTO>> search(
            @RequestParam(required = false) String game,
            @RequestParam(required = false) Integer days,
            @RequestParam(required = false) String city
    ) {
        List<GameSessionDTO> results = gameSessionService.search(game, days, city);
        if (results.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(results);
    } */
  http=inject(HttpClient);
  url = 'http://localhost:8080/api/game-sessions';

  //GET /game-sessions/?game={game}&days={days}&city={city} — recupero lista di sessioni gioco filtrabile per gioco, giorni e città
  getAllGameSessions(game?:string,days?:number,city?:string):Observable<GameSession[]>{
    if(!game && !days && !city){
      return this.http.get<GameSession[]>(this.url);
    }
    if(game && !days && !city){
      return this.http.get<GameSession[]>(this.url+'?game='+game);
    } 
    if(!game && days && !city){
      return this.http.get<GameSession[]>(this.url+'?days='+days);
    } 
    if(!game && !days && city){
      return this.http.get<GameSession[]>(this.url+'?city='+city);
    }   
    if(game && days && !city){  
      return this.http.get<GameSession[]>(this.url+'?game='+game+'&days='+days);
    }
    if(!game && days && city){
      return this.http.get<GameSession[]>(this.url+'?days='+days+'&city='+city);
    }
    return this.http.get<GameSession[]>(this.url+'?game='+game+'&days='+days+'&city='+city);
  }

  //GET /game-sessions/tonight/{city} — recupero lista sessioni di gioco di stasera in quella città
  getGameSessions(city:string):Observable<GameSession[]>{
    return this.http.get<GameSession[]>(this.url +'/tonight/'+city);
  }

  //GET /game-sessions/{id} — recupero sessione di gioco tramite id
  getGameSessionById(id:number):Observable<GameSession>{
    return this.http.get<GameSession>(this.url+'/'+id);
  }

  //POST /game-sessions — creazione sessione di gioco
  createGameSession(gameSession:GameSession):Observable<GameSession>{
    return this.http.post<GameSession>(this.url,gameSession);
  }

  //PUT /game-sessions {id} — modifica della sessione di gioco con quell'id
  updateGameSession(gameSession:GameSession):Observable<GameSession>{
    return this.http.put<GameSession>(this.url+'/'+gameSession.id,gameSession);
  } 

  //DELETE /game-sessions/{id} — cancellazione della sesione di gioco
  deleteGameSession(id:number):Observable<void>{
    return this.http.delete<void>(this.url+'/'+id);
  }


}
