import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafeHtmlPipe } from './safe-html.pipe';
import { SafeUrlPipe } from './safe-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SafeHtmlPipe,
    SafeUrlPipe
  ],
  exports: [
    SafeHtmlPipe,
    SafeUrlPipe
  ]
})
export class PipesModule { }
