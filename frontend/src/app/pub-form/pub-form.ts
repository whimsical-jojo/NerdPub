import { Component, inject, input, OnInit, signal } from '@angular/core';
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

@Component({
  selector: 'app-pub-form',
  imports: [FormsModule, MatInputModule, MatFormFieldModule, MatDialogModule, MatIconModule, MatDatepickerModule
    , MatNativeDateModule, MatButtonModule],
  templateUrl: './pub-form.html',
  styleUrl: './pub-form.css',
})
export class PubForm implements OnInit {
  
  dialogRef = inject(MatDialogRef<PubForm>);
  pubInput=input.required<Pub>();
  service=inject(PubService);
  private data = inject(MAT_DIALOG_DATA) as { mode: 'create' | 'edit' } | undefined;
  mode = signal<'create' | 'edit'>(this.data?.mode ?? 'create');
  
  pub=signal<Pub>({
    name:'',
    address:'',
    city:'',
    phone:'',
    score:0
  });

  ngOnInit(): void {
    if (this.mode() === 'edit') {
      if(this.pubInput()){
        this.pub.set({
        id:this.pubInput().id,
        name:this.pubInput().name,
        address:this.pubInput().address,
        city:this.pubInput().city,
        phone:this.pubInput().phone,
        score:this.pubInput().score
      });
      }
    
    }
  }

  create():void{
    this.service.createPub(this.pub()).subscribe({
    next: (pub) => {
        console.log('Pub salvato con successo!', pub);
        this.pub.set({
          name: '',
          address: '',
          city: '',
          phone: '',
          score: 0
        });
        alert('Pub salvato con successo!');
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio del pub!', err);
        alert('Errore nel salvataggio del pub!');
      }
    });  
  }
  update(): void {
    this.service.updatePub(this.pub()).subscribe({
      next: (pub) => {
        console.log('Account aggiornato con successo!', pub);

        // aggiorna stato locale con risposta server
      },
      error: (err) => {
        console.error("Errore nell'aggiornamento dell'account", err);
      }
    });
    this.dialogRef.close();
  } 
}
