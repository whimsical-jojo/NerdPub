import { Component, computed, inject, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PubService } from '../service/pub-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-city-picker',
  imports: [MatFormField, MatLabel, FormsModule, MatAutocompleteModule, MatInputModule],
  templateUrl: './city-picker.html',
  styleUrl: './city-picker.css',
})
export class CityPicker {
  city = model<string>('');
  pubService = inject(PubService);

  cities = toSignal(this.pubService.getCities(), { initialValue: [''] });

  selected = signal(false);

  selectCity(city: string) {
    this.city.set(city);
    this.selected.set(true);
  }

  deselect() {
    this.city.set('');
    this.selected.set(false);
  }

  //computed filtering
  filteredCities = computed(() => {
    const input = this.city();

    const value =
      typeof input === 'string'
        ? input.toLowerCase()
        : '';

    return this.cities()!.filter(city =>
      city.toLowerCase().includes(value)
    );
  });

  //display function for mat-autocomplete
  displayFn(city: string): string {
    return city;
  }
}
