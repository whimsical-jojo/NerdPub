import { Routes } from '@angular/router';
import { ProfilePage } from './profile-page/profile-page';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'profile',
        component: ProfilePage,
    },
];
