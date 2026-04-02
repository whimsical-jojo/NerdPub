import { Component, computed, inject, input, model, OnInit, output, signal } from '@angular/core';
import { GameService } from '../service/game-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Game } from '../model/entities';
import { MatIcon, MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-game-picker',
  imports: [MatFormField, MatLabel, FormsModule, MatAutocompleteModule, MatInputModule, MatIconModule],
  templateUrl: './game-picker.html',
  styleUrl: './game-picker.css',
})

export class GamePicker implements OnInit {
  gameService = inject(GameService);
  //Inputs & Outputs
  games = signal<Game[]>([]);

  selectedGame = model<Game | null>();

  //Local State
  query = signal<string | Game>('');


  ngOnInit() {
    this.gameService.findAll().subscribe(games => this.games.set(games));
  }


  //The Logic
  filteredGames = computed(() => {
    const val = this.query();
    const searchStr = (typeof val === 'string' ? val : val.title).toLowerCase();

    return this.games().filter(game =>
      game.title.toLowerCase().includes(searchStr)
    );
  });

  selectGame(game: Game | null) {
    this.selectedGame.set(game);
    console.log("Game selected!");
  }

  onInputChange(value: string | Game) {
    // If the input is empty string, the user cleared it.
    this.query.set(value);
    if (value === '') {
      this.selectedGame.set(null);
    }
  }

  displayFn(game: Game | null): string {
    return game?.title ?? '';
  }
}


