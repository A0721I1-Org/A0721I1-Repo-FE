import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResetPasswordComponent} from './forgotpass-module/reset-password/reset-password.component';


const routes: Routes = [
  {
    path: 'employee',
    loadChildren: () => import('./employee-module/employee-module.module').then(module => module.EmployeeModuleModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback-module/feedback-module.module').then(module => module.FeedbackModuleModule)
  },
  {
    path: 'incomef',
    loadChildren: () => import('./income-module/income-module.module').then(module => module.IncomeModuleModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product-module/product-module.module').then(module => module.ProductModuleModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./table-module/table-module.module').then(module => module.TableModuleModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu-module/menu-module.module').then(module => module.MenuModuleModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login-module/login-module.module').then(module => module.LoginModuleModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgotpass-module/forgotpass-module.module').then(module => module.ForgotpassModuleModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./order-module/order-module.module').then(module => module.OrderModuleModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
