import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Page404Component } from './page404/page404.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { UtilsModule } from '../shared/components/utils';
import { PipesModule } from '../shared/pipes';
import { PrimeNGModule } from '../shared/primeng.module';
import { AuthModule } from '../shared/components';


@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    PrimeNGModule,
    PipesModule,
    AuthModule
  ],
  declarations: [
    Page404Component,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    Page404Component,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
