import { Component, computed, inject, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatTab, MatTabLink, MatTabNav, MatTabNavPanel, MatTabsModule} from '@angular/material/tabs';

@Component({
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink, 
    RouterLinkActive, 
    MatTabsModule, 
    MatButtonModule, 
    MatTabNav, 
    MatTabLink, 
    MatTabNavPanel
  ],
  selector: 'app-admin-page',
  templateUrl: './admin-page.html',
})
export class AdminPage {
  links = [
    { path: 'members', label: 'Utenti' },
    { path: 'pubs', label: 'Pub' },
    { path: 'games', label: 'Giochi' },
    { path: 'game-sessions', label: 'Sessioni' }
  ];
}