import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModuleRoutingModule } from './table-module-routing.module';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { DetailTableComponent } from './detail-table/detail-table.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ListTableComponent,
    CreateTableComponent,
    DetailTableComponent,

  ],
    imports: [
        CommonModule,
        TableModuleRoutingModule,
        HttpClientModule,
        NgxPaginationModule,
        ReactiveFormsModule
    ]
})
export class TableModuleModule { }
