import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetpassModuleRoutingModule } from './forgetpass-module-routing.module';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';


@NgModule({
  declarations: [
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgetpassModuleRoutingModule
  ]
})
export class ForgetpassModuleModule { }
