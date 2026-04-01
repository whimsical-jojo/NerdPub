import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { PubTable } from '../../../model/entities';
import { PubTableService } from '../../../service/pub-table-service';

@Component({
  selector: 'app-table-form',
  standalone: true,
  imports: [
    MatDialogModule, FormsModule, MatFormFieldModule, 
    MatInputModule, MatCheckboxModule, MatButtonModule
  ],
  templateUrl: './table-form.html',
  styleUrl: './table-form.css'
})
export class TableForm {
  private dialogRef = inject(MatDialogRef<TableForm>);
  private service = inject(PubTableService);
  
  // Data passed from the pub-page
  // Contains the parent pubId and the table object (if editing)
  data = inject(MAT_DIALOG_DATA) as { pubId: number, table?: PubTable };

  mode = signal<'create' | 'edit'>(this.data.table ? 'edit' : 'create');

  // Initialize the table signal
  // We ensure the pubId is always set from the parent context
  table = signal<Partial<PubTable>>(this.data.table 
    ? { ...this.data.table } 
    : { 
        name: '', 
        capacity: 2, 
        available: true, 
        pubId: this.data.pubId 
      }
  );

  save(): void {
    const currentTable = this.table() as PubTable;
    const request$ = this.mode() === 'edit'
      ? this.service.updatePubTable(currentTable)
      : this.service.createPubTable(currentTable);

    request$.subscribe({
      next: (res) => this.dialogRef.close(res),
      error: (err) => {
        console.error('Error saving table', err);
        alert('Errore durante il salvataggio del tavolo.');
      }
    });
  }
}
