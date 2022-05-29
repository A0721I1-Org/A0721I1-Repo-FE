import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModuleRoutingModule } from './menu-module-routing.module';
import {MenuOderComponent} from "./menu-oder/create-menu-oder.component";



@NgModule({
  declarations: [
   MenuOderComponent
  ],
  imports: [
    CommonModule,
    MenuModuleRoutingModule
  ]
})
export class MenuModuleModule { }
