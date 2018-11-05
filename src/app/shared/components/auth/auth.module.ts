import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { PipesModule } from '../../pipes';
import { UtilsModule } from '../utils';
import { DirectivesModule } from '../../directives';
import { PrimeNGModule } from '../../primeng.module';

import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { ForgotFormComponent } from './forgot-form/forgot-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PrimeNGModule,
    PipesModule,
    UtilsModule,
    DirectivesModule
  ],
  declarations: [
    LoginFormComponent,
    SignupFormComponent,
    ForgotFormComponent
  ],
  exports: [
    LoginFormComponent,
    SignupFormComponent,
    ForgotFormComponent
  ],
})
export class AuthModule { }
