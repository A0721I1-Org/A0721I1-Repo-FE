import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MenuOderComponent} from "./menu-oder/create-menu-oder.component";


const routes: Routes = [
  {
    path: "menu-oder-child",
    component: MenuOderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuModuleRoutingModule { }
