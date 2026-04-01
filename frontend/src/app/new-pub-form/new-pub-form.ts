import { Component, inject } from '@angular/core';
import { PubService } from '../service/pub-service';
import { Pub } from '../model/entities';
import { FormsModule } from '@angular/forms';
/*
@Component({
  selector: 'app-new-pub-form',
  imports: [FormsModule],
  templateUrl: './new-pub-form.html',
  styleUrl: './new-pub-form.css',
})
export class NewPubForm {
  service=inject(PubService);
  newPub:Pub={
    name:'',
    address:'',
    city:'',
    phone:'',
    score:0
  };

  save():void{
    this.service.createPub(this.newPub).subscribe({
    next: (pub) => {
        console.log('Pub salvato con successo!', pub);
        this.newPub = {
          name: '',
          address: '',
          city: '',
          phone: '',
          score: 0
        };
        alert('Pub salvato con successo!');
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio del pub!', err);
        alert('Errore nel salvataggio del pub!');
      }
    });  
  }
}*/
