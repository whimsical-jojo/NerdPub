import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Pub } from '../model/entities';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PubService {
  http=inject(HttpClient);
  url = 'http://localhost:8080/api/pubs';

  // GET /pubs/{id} — recupero lista dei pub filtrabile per città
  search(city?:string):Observable<Pub[]>{
    return !city?this.http.get<Pub[]>(this.url):this.http.get<Pub[]>(this.url+'?city='+city);
  }

  // GET /pubs/{id} — recupero pub tramite id
  getPubById(id:number):Observable<Pub>{
    return this.http.get<Pub>(this.url+'/'+id);
  }

  // PUT /pubs/{id} — modifica pub con quell' id
  updatePub(pub:Pub):Observable<Pub>{
    return this.http.put<Pub>(this.url+'/'+pub.id,pub);
  } 

  // POST /pubs — inserimento pub
  createPub(pub:Pub):Observable<Pub>{
    return this.http.post<Pub>(this.url,pub);
  }

  // DELETE /pubs/{id} — cancellazione pub con quell' id
  deletePub(id:number):Observable<void>{
    return this.http.delete<void>(this.url+'/'+id);
  }

  getCities(): Observable<string[]> {
    return this.http
      .get<string[]>(this.url + '/cities')
      .pipe(catchError(() => of([] as string[])));
  }
}
