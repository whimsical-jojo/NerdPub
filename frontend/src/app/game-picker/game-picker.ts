import { Component, inject, model } from '@angular/core';
import { GameService } from '../service/game-service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-game-picker',
  imports: [MatFormField, MatLabel, FormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './game-picker.html',
  styleUrl: './game-picker.css',
})
/**
 * WARNING UNFINISHED NON FINITO NON USARE
 */
export class GamePicker {
  game = model<string>('');
  gameService = inject(GameService);

  //Yeah it's basically magic don't ask me
  private game$ = toObservable(this.game);

  games = toSignal(
    this.game$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.gameService.search())
    ),
    { initialValue: [] }
  );

  displayFn(game: string): string {
    return game;
  }
}

