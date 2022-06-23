import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {LoginModuleModule} from './login-module/login-module.module';
// @ts-ignore
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// @ts-ignore
import {JWT_OPTIONS, JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {HomeComponent} from './home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {FeedbackModuleModule} from './feedback-module/feedback-module.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    ReactiveFormsModule,
  ],
  providers: [
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
