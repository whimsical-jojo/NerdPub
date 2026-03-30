import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Member } from '../model/entities';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AccountManagementService {

    http = inject(HttpClient);
    url = 'http://localhost:8080/api/account';

    register(member: Member): Observable<Member> {
        return this.http.post<Member>(this.url + "/register", member);
    }
    update(member: Member) {
        if (!member.id) {
            throw new Error('Member ID is required for update');
        }

        return this.http.put<Member>(`${this.url}/${member.id}`, member);
    }
}



