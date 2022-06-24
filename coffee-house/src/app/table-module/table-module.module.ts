import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModuleRoutingModule } from './table-module-routing.module';
import { ListTableComponent } from './list-table/list-table.component';
import { CreateTableComponent } from './create-table/create-table.component';
import { DetailTableComponent } from './detail-table/detail-table.component';
import {HttpClientModule} from '@angular/common/http';
import {ListTableActiveComponent} from './list-table-active/list-table-active.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ListTableComponent,
    CreateTableComponent,
    DetailTableComponent,
    ListTableActiveComponent,
  ],
    imports: [
        CommonModule,
        TableModuleRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})

export class TableModuleModule { }
