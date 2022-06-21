// @ts-ignore
import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
