import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeModuleRoutingModule } from './income-module-routing.module';
import { IncomeComponent } from './income/income.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    IncomeComponent
  ],
  imports: [
    CommonModule,
    IncomeModuleRoutingModule,
    HttpClientModule
  ]
})
export class IncomeModuleModule { }
