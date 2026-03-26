import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../model/entities';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  http = inject(HttpClient)
  url= 'http//localhost:8080/api/games';


  // GET /games — recupero lista di giochi
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url);
  }

  // GET /games?title={title} — recupero lista di giochi con titolo simile
  getGamesByTitle(title: string): Observable<Game[]> {

    return this.http.get<Game[]>(this.url+'?title='+title);
  }

  // GET /games/{id} — recupero gioco con questo id
  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(this.url);
  }

  // POST /games — inserimento nuovo gioco
  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url, game);
  }

  // PUT /games/{id} — modifica gioco
  updateGame(id: number, game: Game): Observable<Game> {
    return this.http.put<Game>(this.url+'/'+id, game);
  }

  // DELETE /games/{id} — cancellazione gioco
  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(this.url+'/'+id);
  }
}
