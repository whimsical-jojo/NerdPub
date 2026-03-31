import { Routes } from '@angular/router';
import { ProfilePage } from './profile-page/profile-page';
import { HomePage } from './home-page/home-page';
import { LoginComponent } from './login/login';
import { adminGuard } from './guards/admin-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: 'homepage',
        component: HomePage,
    },
    {
        path: 'profile',
        canActivate: [authGuard],
        component: ProfilePage,
    },
    
    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: 'admin',
        canActivate: [adminGuard],
        loadComponent: () => import('./admin-page/admin-page').then(m => m.AdminPage)
    },

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage'
    }
];
