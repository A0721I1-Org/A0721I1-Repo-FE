import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IncomeComponent} from "./income-module/income/income.component";

const routes: Routes = [
  {
    path: "employee",
    loadChildren: () => import('./employee-module/employee-module.module').then(module => module.EmployeeModuleModule)
  },
  {
    path: "feedback",
    loadChildren: () => import('./feedback-module/feedback-module.module').then(module => module.FeedbackModuleModule)
  },
  {
    path: "incomef",
    loadChildren: () => import('./income-module/income-module.module').then(module => module.IncomeModuleModule)
  },
  {
    path: "product",
    loadChildren: () => import('./product-module/product-module.module').then(module => module.ProductModuleModule)
  },
  {
    path: "table",
    loadChildren: () => import('./table-module/table-module.module').then(module => module.TableModuleModule)
  },
  {
    path: "menu",
    loadChildren: () => import('./menu-module/menu-module.module').then(module => module.MenuModuleModule)
  },
  {
    path: "login",
    loadChildren: () => import('./login-module/login-module.module').then(module => module.LoginModuleModule)
  },
  {
    path: "forget-password",
    loadChildren: () => import('./forgetpass-module/forgetpass-module.module').then(module => module.ForgetpassModuleModule)
  },
  {
    path: "oder",
    loadChildren: () => import('./order-module/order-module.module').then(module => module.OrderModuleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
