import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { InternalErrorComponent } from './components/common/internal-error/internal-error.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { EcommerceComponent } from './components/dashboard/ecommerce/ecommerce.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ProductsComponent } from './components/pages/ecommerce/products/products.component';
import { CategorysComponent } from './components/category/categorys/categorys.component';
import { UsersComponent } from './components/user/users/users.component';
import { authGuard } from './components/authentication/guard/auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'authentication/login', pathMatch: 'full' },
    { path: 'authentication/login', component: LoginComponent },
    { path: 'dashboard', component: EcommerceComponent,canActivate: [authGuard] },
    { path: 'dashboard/users', component: UsersComponent,canActivate: [authGuard] },
    { path: 'dashboard/products', component: ProductsComponent,canActivate: [authGuard] },
    { path: 'dashboard/categories', component: CategorysComponent,canActivate: [authGuard] },
    { path: 'account', component: AccountComponent,canActivate: [authGuard] },
    { path: 'error-500', component: InternalErrorComponent },

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
