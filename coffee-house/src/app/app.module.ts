import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FeedbackModuleModule} from "./feedback-module/feedback-module.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FeedbackModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
