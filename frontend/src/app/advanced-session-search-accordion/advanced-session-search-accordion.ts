import { Component, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { GamePicker } from "../game-picker/game-picker";
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-advanced-session-search-accordion',
  imports: [MatButtonModule,
    MatExpansionModule,
    MatExpansionModule,
    MatSliderModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './advanced-session-search-accordion.html',
  styleUrl: './advanced-session-search-accordion.css',
})
export class AdvancedSessionSearchAccordion {
  daysAhead = model<number>(0);
}
