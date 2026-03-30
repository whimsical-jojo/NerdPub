import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { GameSession } from '../model/entities';

@Component({
  selector: 'app-game-session-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-session-preview.html',
  styleUrl: './game-session-preview.css',
})
export class GameSessionPreview {
  gameSession = input.required<GameSession>();
  isBooked = input<boolean>(false);

  actionClicked = output<{
    session: GameSession;
    action: 'book' | 'cancel';
  }>();

  onBookClick() {
    this.actionClicked.emit({
      session: this.gameSession(),
      action: this.isBooked() ? 'cancel' : 'book',
    });
  }
}
