// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import {FeedbackModuleModule} from "./feedback-module/feedback-module.module";
=======
import {LoginModuleModule} from './login-module/login-module.module';
// @ts-ignore
import {ToastrModule} from 'ngx-toastr';
// @ts-ignore
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// @ts-ignore
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';

import { HomeComponent } from './home/home.component';
// @ts-ignore
import {HttpClientModule} from '@angular/common/http';
// @ts-ignore
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
>>>>>>> 632985dd6204464c513c3ca76b9e95be6cb2387d

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    FeedbackModuleModule
=======
    HttpClientModule,
    FormsModule ,
    LoginModuleModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
    }),
    BrowserAnimationsModule,
    JwtModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
>>>>>>> 632985dd6204464c513c3ca76b9e95be6cb2387d
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
