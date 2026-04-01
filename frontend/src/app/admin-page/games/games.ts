import { Component, inject, model, signal } from '@angular/core';
import { GamePicker } from "../../game-picker/game-picker";
import { GameService } from '../../service/game-service';
import { Game } from '../../model/entities';

@Component({
  selector: 'app-games',
  imports: [GamePicker],
  templateUrl: './games.html',
  styleUrl: './games.css',
})
export class AdminGamesComponent {
  gameService = inject(GameService);
  games = model<Game[]>([]);
  ngOnInit () {
    this.gameService.findAll().subscribe(games => this.games.set(games));
  }
}
