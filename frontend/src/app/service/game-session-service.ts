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

  getGameSessions(city?:string):Observable<GameSession[]>{
    return this.http.get<GameSession[]>(this.url +'/tonight/'+city);
  }
}
