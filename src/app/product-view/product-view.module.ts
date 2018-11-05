import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core';
import { PipesModule } from '../shared/pipes';
// import { PrimeNGModule } from '../shared/primeng.module';
import { ProductListModule, UtilsModule } from '../shared/components';
import { ProductViewComponent } from './product-view.component';
import { ProductComponent } from './product/product.component';
import { DirectivesModule } from '../shared/directives';

import { GalleriaModule } from 'primeng/galleria';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    PipesModule,
    ProductListModule,
    UtilsModule,
    DirectivesModule,
    GalleriaModule
  ],
  declarations: [
    ProductViewComponent,
    ProductComponent
  ],
  exports: [
    ProductViewComponent,
    ProductComponent
  ]
})
export class ProductViewModule { }
