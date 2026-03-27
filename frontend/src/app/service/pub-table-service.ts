import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PubTable } from '../model/entities';

@Injectable({
  providedIn: 'root',
})
export class PubTableService {
  http=inject(HttpClient);
  url = 'http://localhost:8080/api/tables';

  // GET /tables?name={name} — recupero lista tavoli con nome simile
    getPubTables(name?:string):Observable<PubTable[]>{
      return !name?this.http.get<PubTable[]>(this.url):this.http.get<PubTable[]>(this.url+'?name='+name);
    }
    // GET /tables/{id} — recupero tavolo tramite id
    getPubTableById(id:number):Observable<PubTable>{
      return this.http.get<PubTable>(this.url+'/'+id);
    }

    //PUT /tables/{id} — modifica tavolo con quell'id
    updatePubTable(pubTable:PubTable):Observable<PubTable>{
      return this.http.put<PubTable>(this.url+'/'+pubTable.id,pubTable);
    } 

    //POST /tables — inserimento tavolo
    createPubTable(pubTable:PubTable):Observable<PubTable>{
      return this.http.post<PubTable>(this.url,pubTable);
    }
  
    //DELETE /tables/{id} — cancellazione tavolo con quell'id
    deletePubTable(id:number):Observable<void>{
      return this.http.delete<void>(this.url+'/'+id);
    }
}
