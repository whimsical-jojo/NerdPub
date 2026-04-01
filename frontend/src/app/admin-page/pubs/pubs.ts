import { Component, signal, inject } from '@angular/core';// Your service
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { PubService } from '../../service/pub-service';
import { Pub, PubTable } from '../../model/entities';
import { CityPicker } from '../../city-picker/city-picker';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { PubTableService } from '../../service/pub-table-service';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-pubs',
  imports: [
  MatExpansionModule,
  MatCardModule,
  CityPicker,
  MatIconModule,
  MatDividerModule,
  MatChipsModule,
  MatButtonModule
  ],
  templateUrl: './pubs.html',
  styleUrl: './pubs.css'
})
export class AdminPubsComponent {
  private pubService = inject(PubService);
  private pubTableService = inject(PubTableService);
  private dialog = inject(MatDialog);

  pubs = signal<Pub[]>([]);
  selectedCity = signal<string>('');

  // Dictionary to hold tables per pub: Map<pubId, PubTable[]>
  tablesMap = signal<Map<number, PubTable[]>>(new Map());

  searchPubs() {
    this.pubService.search(this.selectedCity() ?? '').subscribe(res => {
      this.pubs.set(res);
    });
  }

  loadTables(pubId: number) {
    // Only load if we haven't loaded them yet (optional optimization)
    this.pubTableService.getTablesByPubId(pubId).subscribe(tables => {
      this.tablesMap.update(map => {
        const newMap = new Map(map);
        newMap.set(pubId, tables);
        return newMap;
      });
    });
  }
  //TODO 
  openPubForm(pub?: Pub) {/*
    const ref = this.dialog.open(PubFormDialog, { data: pub });
    ref.afterClosed().subscribe(result => {
       if (result) this.searchPubs(); // Refresh list on save
    });*/
  }

  //TODO
  openTableForm(pubId: number, table?: PubTable) {/*
    const ref = this.dialog.open(TableFormDialog, { 
      data: { pubId, table } 
    });
    ref.afterClosed().subscribe(result => {
       if (result) this.loadTables(pubId); // Refresh specific pub's tables
    });*/
  }
  
  deleteTable(id: number) {
    // Implementation for delete...
  }
}