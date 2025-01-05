import { Routes } from '@angular/router';

import { HomepageComponent } from './components/homepage/homepage.component';
import { AuthComponent } from './components/auth/auth.component';
import { CartComponent } from './components/cart/cart.component';
import { authGuard } from './guards/auth.guard';
import { CosmeticComponent } from './components/cosmetic/cosmetic.component';
import { SearchComponent } from './components/search/search.component';
import { adminGuard } from './guards/admin.guard';
import { AdminComponent } from './components/admin/admin.component';
import { ProductComponent } from './components/admin/product/product.component';
export const routes: Routes = [
    {path: '', redirectTo: 'homepage', pathMatch: 'full'},
    {path: 'homepage', component: HomepageComponent},
    {path: 'cosmetics/:id', component: CosmeticComponent},
    {path: 'search', component: SearchComponent},
    {path: 'auth/:type-auth', component: AuthComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'product', component: ProductComponent},
    {
        path: 'user',
        canActivateChild: [authGuard],
        children: [
            {path: 'cart', component: CartComponent},
        ]
    },
    {
        path: 'admin',
        component : AdminComponent,
        canActivateChild: [adminGuard],
        children: [
            {path: 'products', component: ProductComponent}
        ]
    },
    {path: '**', component: HomepageComponent} // Wildcard route for a 404 page
];

// Có thể xử lý not null cho query params bằng Setting up redirects

