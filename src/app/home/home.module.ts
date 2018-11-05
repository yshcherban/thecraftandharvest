import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { CoreModule } from '../core';
import { PipesModule } from '../shared/pipes';
import { PrimeNGModule } from '../shared/primeng.module';
import { DirectivesModule } from '../shared/directives';
import { ProductListModule, UtilsModule } from '../shared/components';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    PrimeNGModule,
    PipesModule,
    DirectivesModule,
    UtilsModule,
    ProductListModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
