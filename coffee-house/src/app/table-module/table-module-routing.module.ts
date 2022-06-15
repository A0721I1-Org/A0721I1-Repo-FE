import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListTableComponent} from './list-table/list-table.component';
import {CreateTableComponent} from './create-table/create-table.component';
import {DetailTableComponent} from './detail-table/detail-table.component';
import {ListTableActiveComponent} from './list-table-active/list-table-active.component';

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
    path: 'detail/:id',
    component: DetailTableComponent
  },
  {
    path: 'active',
    component: ListTableActiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableModuleRoutingModule {
}
