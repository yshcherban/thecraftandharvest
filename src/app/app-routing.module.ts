import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from './core';
import { HomeComponent } from './home';
import { ShopComponent } from "./shop/shop.component";
import { ContactComponent } from "./contact/contact.component";
import { ProductViewComponent } from './product-view';
import { AuthGuardService as AuthGuard } from './shared/services';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product/:slug', component: ProductViewComponent },
  // { path: 'auth', component: Component, canActivate: [AuthGuard],
  //   children: [
  //     { path: '', redirectTo: 'login', pathMatch: 'full' },
  //   ]
  // },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
