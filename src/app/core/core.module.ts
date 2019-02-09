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

import { GooglemapComponent } from './googlemap/googlemap.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    RouterModule,
    PrimeNGModule,
    PipesModule,
    AuthModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDr1tXLGo7mhzb8Y_VZPakDh32hKawFSoQ'
    })
  ],
  declarations: [
    Page404Component,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    GooglemapComponent
  ],
  exports: [
    Page404Component,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class CoreModule { }
