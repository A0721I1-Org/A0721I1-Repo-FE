import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient} from '@angular/common/http';
import {LoginModuleModule} from './login-module/login-module.module';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FeedbackModuleModule} from './feedback-module/feedback-module.module';
import {HeaderComponent} from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FeedbackModuleModule,
    FormsModule,
    LoginModuleModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
    BrowserAnimationsModule,
    JwtModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FeedbackModuleModule,
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
