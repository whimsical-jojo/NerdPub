import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameSession } from '../model/entities';
import { GameService } from '../service/game-service';
import { PubTableService } from '../service/pub-table-service';

@Component({
  selector: 'app-game-session-preview',
  imports: [FormsModule,CommonModule],
  templateUrl: './game-session-preview.html',
  styleUrl: './game-session-preview.css',
})
export class GameSessionPreview {
  gameSession = input.required<GameSession>();

    // Evento per gestire il click sulla card (es. per aprire il dettaglio)
  selectSession = output<GameSession>();

  onDetailsClick() {
    this.selectSession.emit(this.gameSession());
  }
}
