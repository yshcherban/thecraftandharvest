import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { HomeModule } from './home';
import { ProductViewModule } from './product-view';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ShopComponent } from './shop/shop.component';
import { CoreModule } from './core';
import { ProductListModule, UtilsModule } from './shared/components';

import { PipesModule } from './shared/pipes';
import { PrimeNGModule } from './shared/primeng.module';
import { DirectivesModule } from './shared/directives';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    HomeModule,
    ProductViewModule,
    CoreModule,
    ProductListModule,
    UtilsModule,
    PipesModule,
    PrimeNGModule,
    DirectivesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
