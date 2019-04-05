import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguCarouselModule } from '@ngu/carousel';

import { PipesModule } from '../../pipes';
import { ErrorLabelComponent } from './error-label/error-label.component';
import { ReviewStarsComponent } from './review-stars/review-stars.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    NguCarouselModule
  ],
  declarations: [
    ErrorLabelComponent,
    ReviewStarsComponent,
    PreloaderComponent,
    PlaceholderComponent,
    CarouselComponent
  ],
  exports: [
    ErrorLabelComponent,
    ReviewStarsComponent,
    PreloaderComponent,
    PlaceholderComponent,
    CarouselComponent
  ]
})
export class UtilsModule { }
