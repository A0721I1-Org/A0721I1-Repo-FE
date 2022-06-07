import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';


const routes: Routes = [
  {
    path: 'create',
    component: CreateEmployeeComponent
  },
  {
    path: 'edit',
    component: EditEmployeeComponent
  },
  {
    path: 'list',
    component: ListEmployeeComponent
  },
  {
    path: 'detail/:userRoutes',
    component: DetailEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeModuleRoutingModule { }
