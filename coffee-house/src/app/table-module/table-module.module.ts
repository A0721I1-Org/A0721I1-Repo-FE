import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModuleRoutingModule } from './table-module-routing.module';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { DetailTableComponent } from './detail-table/detail-table.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListTableComponent,
    CreateTableComponent,
    DetailTableComponent
  ],
  imports: [
    CommonModule,
    TableModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TableModuleModule { }
