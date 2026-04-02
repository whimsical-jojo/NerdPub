import { Component, computed, inject, input, OnInit, signal } from '@angular/core';
import { PubService } from '../service/pub-service';
import { Pub } from '../model/entities';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CityPicker } from "../city-picker/city-picker";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-pub-form',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatIconModule, MatDatepickerModule,
    MatNativeDateModule, MatButtonModule, CityPicker, MatDivider],
  templateUrl: './pub-form.html',
  styleUrl: './pub-form.css',
})
export class PubForm {
  dialogRef = inject(MatDialogRef<PubForm>);
  private service = inject(PubService);
  
  //Get the data from the dialog config
  //Usually, you pass the whole object in 'data'
  private data = inject(MAT_DIALOG_DATA) as { pub?: Pub, mode : 'create' | 'edit'} | undefined;

  //Determine mode and initialize signal with a default empty object
  //Determine mode and initialize signal with a default empty object
  mode = signal<'create' | 'edit'> (this.data?.pub ? 'edit' : 'create');
  
  //Initialize the signal using spread logic to avoid hardcoding fields
  pub = signal<Pub>(this.data?.pub 
    ? { ...this.data.pub } // Clone if editing
    : { name: '', address: '', city: '' } as Pub // Default if creating
  );

  save(): void {
    const currentPub = this.pub();
    const request$ = this.mode() === 'edit' 
      ? this.service.updatePub(currentPub) 
      : this.service.createPub(currentPub);

    request$.subscribe({
      next: (savedPub) => {
        console.log('Operazione riuscita:', savedPub);
        this.dialogRef.close(savedPub); // Pass back the saved object
      },
      error: (err) => {
        console.error('Errore:', err);
        alert('Si è verificato un errore durante il salvataggio.');
      }
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
