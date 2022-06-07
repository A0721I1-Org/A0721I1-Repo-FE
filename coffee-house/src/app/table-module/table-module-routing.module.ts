import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListTableComponent} from './list-table/list-table.component';
import {CreateTableComponent} from './create-table/create-table.component';
import {DetailTableComponent} from './detail-table/detail-table.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListTableComponent
  },
  {
    path: 'create',
    component: CreateTableComponent
  },
  {
    path: 'detail',
    component: DetailTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableModuleRoutingModule { }
