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
        loadComponent: () =>
            import('./profile-page/profile-page').then(m => m.ProfilePage)
    },

    {
        path: 'login',
        component: LoginComponent,
    },

    {
        path: 'admin',
        canActivate: [adminGuard],
        canActivateChild: [adminGuard],
        loadComponent: () =>
            import('./admin-page/admin-page').then(m => m.AdminPage),
        children: [
            {
                path: 'members',
                loadComponent: () =>
                    import('./admin-page/members/members').then(m => m.AdminMembersComponent)
            },
            {
                path: 'pubs',
                loadComponent: () =>
                    import('./admin-page/pubs/pubs').then(m => m.AdminPubsComponent)
            },
            {
                path: 'games',
                loadComponent: () =>
                    import('./admin-page/games/games').then(m => m.AdminGamesComponent)
            },
            {
                path: 'game-sessions',
                loadComponent: () =>
                    import('./admin-page/game-sessions/game-sessions').then(m => m.AdminSessionsComponent)
            },
            {
                path: '',
                redirectTo: 'members',
                pathMatch: 'full'
            }
        ]
    },

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'homepage'
    }
];
