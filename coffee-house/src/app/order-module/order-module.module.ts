import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderModuleRoutingModule } from './order-module-routing.module';
import { OderComponent } from './oder/oder.component';


@NgModule({
  declarations: [
    OderComponent
  ],
  imports: [
    CommonModule,
    OrderModuleRoutingModule
  ]
})
export class OrderModuleModule { }
