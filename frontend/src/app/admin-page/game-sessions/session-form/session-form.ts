import { Component, inject, signal, computed, effect } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Game, GameSession, Pub, PubTable } from '../../../model/entities';
import { GameService } from '../../../service/game-service';
import { GameSessionService } from '../../../service/game-session-service';
import { PubTableService } from '../../../service/pub-table-service';
import { PubService } from '../../../service/pub-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CityPicker } from "../../../city-picker/city-picker";
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption, provideNativeDateAdapter } from "@angular/material/core";
import { GamePicker } from "../../../game-picker/game-picker";
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-session-form',
  imports: [
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CityPicker,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatOption,
    GamePicker,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './session-form.html',
  styleUrls: ['./session-form.css'],
  providers: [provideNativeDateAdapter()]
})
export class SessionForm {
  private dialogRef = inject(MatDialogRef<SessionForm>);
  private pubTableService = inject(PubTableService);
  private gameService = inject(GameService);
  private pubService = inject(PubService);
  private sessionService = inject(GameSessionService);
  data = inject(MAT_DIALOG_DATA) as { session?: GameSession };

  //Selection State
  selectedCity = signal<string>('');
  selectedPub = signal<Pub | null>(null);
  selectedDate = signal<Date | null>(null);
  selectedTable = signal<PubTable | null>(null);
  selectedGame = signal<Game | null>(null);

  //Data Lists (Loaded dynamically)
  pubsInCity = signal<Pub[]>([]);
  availableTables = signal<PubTable[]>([]);
  allGames = signal<Game[]>([]); // Loaded once on init

  minDate : Date = new Date();

  constructor() {
    // Load games immediately
    this.gameService.findAll().subscribe(games => this.allGames.set(games));

    // If editing, pre-fill the signals
    if (this.data?.session) {
      const s = this.data.session;
      this.selectedCity.set(s.table.pub.city);
      this.selectedPub.set(s.table.pub);
      this.selectedDate.set(new Date(s.date));
      this.selectedTable.set(s.table);
      this.selectedGame.set(s.game);
      this.loadPubs(s.table.pub.city);
      this.loadTables();
    }

    // Effect: If city changes, reset and reload pubs
    effect(() => {
      const city = this.selectedCity();
      if (city) {
        this.loadPubs(city);
        this.selectedPub.set(null); // Reset downstream
      }
    }, { allowSignalWrites: true });
  }

  loadPubs(city: string) {
    this.pubService.search(city).subscribe(res => this.pubsInCity.set(res));
  }

  // Called when Date or Pub changes
  loadTables() {
    const pub = this.selectedPub();
    const date = this.selectedDate();
    console.log("Date: " + date);
    console.log("Date ISO: " + date?.toLocaleDateString('en-CA'));
    if (pub?.id && date) {
      this.pubTableService.getAvailableTables(pub.id, date.toLocaleDateString('en-CA'))
        .subscribe(tables => this.availableTables.set(tables));
    }
  }

  save() {
    const sessionData: Partial<GameSession> = {
      id: this.data?.session?.id,
      date: this.selectedDate()!.toLocaleDateString('en-CA'),
      gameId: this.selectedGame()?.id,
      tableId: this.selectedTable()?.id
    };

    const request$ = sessionData.id
      ? this.sessionService.update(sessionData as GameSession)
      : this.sessionService.create(sessionData as GameSession);

    request$.subscribe(() => this.dialogRef.close(true));
  }

  onPubChange(pub: Pub) {
    this.selectedPub.set(pub); // Update the signal
    console.log("pub selected!");
    console.log(this.selectedPub());
    this.loadTables();         // Trigger the side effect
  }
}