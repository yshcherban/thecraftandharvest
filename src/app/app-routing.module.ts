import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Page404Component } from './core';
import { HomeComponent } from './home';
import { ProductViewComponent } from './product-view';
import { AuthGuardService as AuthGuard } from './shared/services';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
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
