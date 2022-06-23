import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableModuleRoutingModule} from './table-module-routing.module';
import {CreateTableComponent} from './create-table/create-table.component';
import {DetailTableComponent} from './detail-table/detail-table.component';
import {EditTableComponent} from './edit-table/edit-table.component';
import {ListTableComponent} from './list-table/list-table.component';
import {HttpClientModule} from '@angular/common/http';
import {ListTableActiveComponent} from './list-table-active/list-table-active.component';
import {ReactiveFormsModule} from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    ListTableComponent,
    CreateTableComponent,
    DetailTableComponent,
    EditTableComponent,
    ListTableActiveComponent
  ],
  imports: [
    CommonModule,
    TableModuleRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})

export class TableModuleModule {
}
