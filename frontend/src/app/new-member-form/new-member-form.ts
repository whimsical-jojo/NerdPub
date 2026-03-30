import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Member } from '../model/entities';
import { AccountManagementService } from '../service/account-management-service';

@Component({
  selector: 'app-new-member-form',
  imports: [FormsModule],
  templateUrl: './new-member-form.html',
  styleUrl: './new-member-form.css',
})
export class NewMemberForm {
  service=inject(AccountManagementService);
  newMember:Member={
    firstName:'',
    lastName:'',
    username:'',
    dob:new Date()
  };

  save():void{
    this.service.register(this.newMember).subscribe({
    next: (member) => {
        console.log('Account salvato con successo!', member);
        this.newMember = {
          firstName:'',
          lastName:'',
          username:'',
          dob:new Date()
        };
        alert('Account salvato con successo!');
        
      },
      error: (err) => {
        console.log("Errore nel salvataggio dell'account", err);
        alert("Errore nel salvataggio dell'account");
      }
    });  
  }
}
