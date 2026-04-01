import { Inject, Injectable } from '@angular/core';
import { Member } from '../model/entities';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  http=inject(HttpClient);
  url = 'http://localhost:8080/api/members';

  // GET /members/{id} — recupero membro tramite id
  getMemberById(id:number):Observable<Member>{
    return this.http.get<Member>(this.url+'/'+id);
  }
    
  // GET /members?username={username} — recupero lista membri con username simile
  searchMembers(username:string):Observable<Member[]>{
    return this.http.get<Member[]>(this.url+'?username='+username);
  } 

  toggleBan(id:number):Observable<Member>{
    return this.http.put<Member>(this.url+'/'+id,null);
  }
}
