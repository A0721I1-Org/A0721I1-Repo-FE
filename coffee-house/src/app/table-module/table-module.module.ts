import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModuleRoutingModule } from './table-module-routing.module';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { DetailTableComponent } from './detail-table/detail-table.component';
import { EditTableComponent } from './edit-table/edit-table.component';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ListTableComponent,
    CreateTableComponent,
    DetailTableComponent,
    EditTableComponent
  ],
  imports: [
    CommonModule,
    TableModuleRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class TableModuleModule { }
