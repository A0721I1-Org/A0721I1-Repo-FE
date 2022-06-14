import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// <<<<<<< HEAD
import {LoginModuleModule} from './login-module/login-module.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
// =======
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// >>>>>>> origin/employee-management

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
// <<<<<<< HEAD
    AppRoutingModule,
    LoginModuleModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
    }),
    BrowserAnimationsModule,
    JwtModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
// =======
// >>>>>>> origin/employee-management
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
