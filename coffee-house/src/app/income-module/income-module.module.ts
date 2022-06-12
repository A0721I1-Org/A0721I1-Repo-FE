import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeModuleRoutingModule } from './income-module-routing.module';
import { IncomeComponent } from './income/income.component';


@NgModule({
  declarations: [
    IncomeComponent
  ],
  imports: [
    CommonModule,
    IncomeModuleRoutingModule
  ]
})
export class IncomeModuleModule { }
