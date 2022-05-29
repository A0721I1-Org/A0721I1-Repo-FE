import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OderComponent} from "./oder/oder.component";

const routes: Routes = [
  {
    path: "oder-child",
    component: OderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderModuleRoutingModule { }
