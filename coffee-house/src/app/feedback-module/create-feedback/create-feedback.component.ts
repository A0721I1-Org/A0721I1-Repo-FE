import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {FeedbackService} from "../service/feedback.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  createFeedbackForm: FormGroup = new FormGroup({
    contentFeedback: new FormControl(),
    namePeopleFeedback: new FormControl(),
    emailPeopleFeedback: new FormControl(),
    imageFeedback: new FormControl()
  })

  constructor(private feedBackService: FeedbackService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const feedBack = this.createFeedbackForm.value;
    this.feedBackService.saveFeedback(feedBack).subscribe(() => {
      alert('Tạo mới phản hồi thành công');
    }, (e) => { console.log(e);
    }, () => {
      this.router.navigateByUrl('/');
    });
  }

}
