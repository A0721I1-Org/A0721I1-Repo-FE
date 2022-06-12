import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedbackModuleRoutingModule } from './feedback-module-routing.module';
import { CreateFeedbackComponent } from './create-feedback/create-feedback.component';
import { ListFeedbackComponent } from './list-feedback/list-feedback.component';
import { DetailFeedbackComponent } from './detail-feedback/detail-feedback.component';


@NgModule({
  declarations: [
    CreateFeedbackComponent,
    ListFeedbackComponent,
    DetailFeedbackComponent
  ],
  imports: [
    CommonModule,
    FeedbackModuleRoutingModule
  ]
})
export class FeedbackModuleModule { }
