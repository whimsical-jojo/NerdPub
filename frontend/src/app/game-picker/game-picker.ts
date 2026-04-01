import { Component, computed, inject, input, model, output, signal } from '@angular/core';
import { GameService } from '../service/game-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { Game } from '../model/entities';

@Component({
  selector: 'app-game-picker',
  imports: [MatFormField, MatLabel, FormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './game-picker.html',
  styleUrl: './game-picker.css',
})

export class GamePicker {

  //Inputs & Outputs
  games = input<Game[]>([]);
  selectedGame = output<Game | null>();

  //Local State
  query = signal<string | Game>('');

  //The Logic
  filteredGames = computed(() => {
    const val = this.query();
    const searchStr = (typeof val === 'string' ? val : val.title).toLowerCase();
    
    return this.games().filter(game => 
      game.title.toLowerCase().includes(searchStr)
    );
  });

  selectGame(game: Game) {
    console.log("Game selected:" + game.title);
    this.selectedGame.emit(game);
  }

  displayFn(game: Game | null): string {
    return game?.title ?? '';
  }
}


