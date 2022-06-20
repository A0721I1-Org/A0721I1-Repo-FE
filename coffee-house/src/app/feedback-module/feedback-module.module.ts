import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackModuleRoutingModule } from './feedback-module-routing.module';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { DetailFeedbackComponent } from './detail-feedback/detail-feedback.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "@angular/fire";
import {environment} from "./environments/environment";



@NgModule({
  declarations: [
    CreateFeedbackComponent,
    ListFeedbackComponent,
    DetailFeedbackComponent
  ],
  exports: [
    CreateFeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackModuleRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class FeedbackModuleModule { }
