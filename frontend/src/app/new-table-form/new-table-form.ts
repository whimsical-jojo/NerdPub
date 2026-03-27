import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PubTableService } from '../service/pub-table-service';
import { Pub, PubTable } from '../model/entities';
import { PubService } from '../service/pub-service';

@Component({
  selector: 'app-new-table-form',
  imports: [FormsModule],
  templateUrl: './new-table-form.html',
  styleUrl: './new-table-form.css',
})
export class NewTableForm{
  service=inject(PubTableService);
  pubService=inject(PubService);
  pubs=signal<Pub[]>([])
  ngOnInit():void{
    this.pubService.getPubs().subscribe({
      next: (pubs) => {
        this.pubs.set(pubs);
      }});
  }
  newTable:PubTable={
    name:'',  
    capacity:0,
    available:true,
    pub:{
            name:'',
            address:'',
            city:'',
            phone:'',
            score:0
          },
    pubId:0
  };

  save():void{
    this.service.createPubTable(this.newTable).subscribe({
    next: (table) => {
        console.log('Tavolo salvato con successo!', table);
        this.newTable = {
          name:'',
          capacity:0,
          available:true,
          pub:{
            name:'',
            address:'',
            city:'',
            phone:'',
            score:0
          },
          pubId:0
        };
        alert('Tavolo salvato con successo!');
        
      },
      error: (err) => {
        console.log('Errore nel salvataggio del tavolo!', err);
        alert('Errore nel salvataggio del tavolo!');
      }
    });  
  }
}
