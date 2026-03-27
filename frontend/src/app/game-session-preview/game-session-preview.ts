import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameSession } from '../model/entities';
import { GameService } from '../service/game-service';
import { PubTableService } from '../service/pub-table-service';
import { GameSessionBookingService } from '../service/game-session-booking-service';
import { AuthService } from '../service/auth-service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login';

@Component({
  selector: 'app-game-session-preview',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './game-session-preview.html',
  styleUrl: './game-session-preview.css',
})
export class GameSessionPreview {
  //required session input
  gameSession = input.required<GameSession>();

  //whether user booked this session
  isBooked = input<boolean>(false);

  //emit action to parent
  actionClicked = output<{
    session: GameSession;
    action: 'book' | 'cancel';
  }>();

  onBookClick() {
    console.log("Clicked on book/ cancel!");
    this.actionClicked.emit({
      session: this.gameSession(),
      action: this.isBooked() ? 'cancel' : 'book'
    });
  }
}
