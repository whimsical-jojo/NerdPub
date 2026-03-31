import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GameSession } from '../model/entities';

@Injectable({
  providedIn: 'root',
})
export class GameSessionService {
  http=inject(HttpClient);
  
  url = 'http://localhost:8080/api/game-sessions';

  searchGameSessions(
  game?: string,
  days?: number,
  city?: string
): Observable<GameSession[]> {

  //If ONLY city is provided it calls the default games tonight
  if (city && !game && !days) {
    return this.gamesTonight(city);
  }

  let params = new HttpParams();

  if (game) {
    params = params.set('game', game);
  }

  if (days !== undefined && days !== null) {
    params = params.set('days', days);
  }

  if (city) {
    params = params.set('city', city);
  }

  return this.http.get<GameSession[]>(this.url, { params });
}

  /**
   * Returns the game sessions tonight in a given city
   */
  gamesTonight(city: string): Observable<GameSession[]> {
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
