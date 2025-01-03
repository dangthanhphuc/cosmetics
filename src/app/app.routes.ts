import { Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'homepage', pathMatch: 'full'},
    {path: 'homepage', component: HomepageComponent},
    {path: 'auth/:type-auth', component: AuthComponent},
    {
        path: 'user',
        canActivateChild: [authGuard],
        children: [
            {path: 'cart', component: CartComponent},
        ]
    },
    {path: '**', component: HomepageComponent} // Wildcard route for a 404 page
];

// Có thể xử lý not null cho query params bằng Setting up redirects

