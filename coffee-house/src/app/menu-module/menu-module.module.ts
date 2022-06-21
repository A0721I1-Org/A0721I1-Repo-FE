import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuModuleRoutingModule } from './menu-module-routing.module';
import {MenuOrderComponent} from './menu-order/create-menu-order.component';



@NgModule({
  declarations: [
   MenuOrderComponent
  ],
  imports: [
    CommonModule,
    MenuModuleRoutingModule
  ]
})
export class MenuModuleModule { }
