import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuOrderComponent} from './menu-order/create-menu-order.component';



const routes: Routes = [
  {
    path: 'menu-order-child',
    component: MenuOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuModuleRoutingModule { }
