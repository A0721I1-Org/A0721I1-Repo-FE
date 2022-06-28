import {Component, OnInit} from '@angular/core';
import {Feedback} from '../../model/feedback';
import {FeedbackService} from '../service/feedback.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent implements OnInit {

  feedbackList: Feedback[] = [];
  feedbackDetail: Feedback = {
    idFeedback: 0,
    codeFeedback: '',
    dateFeedback: '',
    contentFeedback: '',
    namePeopleFeedback: '',
    emailPeopleFeedback: '',
    imageFeedback: '',
  };
  date: string;
  indexPagination = 0;
  totalPagination: number;
  totalPaginationArray: number[] = [];
  listFeedbackNotPagination: Feedback[] = [];
  public searchFeedback: FormGroup;
  message = false;

  constructor(private feedbackService: FeedbackService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getAllNotPagination();
    this.searchFeedback = this.fb.group({
      date: ['']
    });
    if (this.feedbackList == null) {
      this.message = true;
    }
  }

  getAll() {
    this.feedbackService.getAll(0).subscribe((feedbackList: Feedback[]) => {
      if (feedbackList !== null) {
        this.message = false;
        this.feedbackList = feedbackList['content'];
        this.totalPagination = feedbackList['totalPages'];
        console.log(feedbackList);
        console.log(this.feedbackList);
        console.log(typeof feedbackList);
        console.log(this.indexPagination);
      }
    });
  }

  getDetailFeedback(id: number) {
    this.feedbackService.findById(id).subscribe(feedback => {
      this.feedbackDetail = feedback;
    });

  }

  getAllNotPagination() {
    this.feedbackService.getAllNotPagination().subscribe(feedbackList => {
      this.listFeedbackNotPagination = feedbackList;
      if ((this.listFeedbackNotPagination.length % 10) != 0) {
        this.totalPagination = (Math.round(this.listFeedbackNotPagination.length / 10)) + 1;
        for (let i = 0; i < this.totalPagination; i++) {
          this.totalPaginationArray[i] = i + 1;
          console.log(this.totalPaginationArray[i]);
        }
      }
      console.log(this.totalPagination);
    });
  }

  search() {
    this.feedbackService.getFeedbackByDate(this.searchFeedback.value.date, 0).subscribe(feedbackList => {
      if (feedbackList == null) {
        this.message = true;
      } else {
        this.message = false;
        this.feedbackList = feedbackList['content'];
      }
    });
    this.feedbackService.getFeedbackByDateNotPagination(this.searchFeedback.value.date).subscribe(feedbackList => {
      if (feedbackList == null) {
        this.message = true;
      } else {
        this.message = false;
        this.listFeedbackNotPagination = feedbackList;
        // tslint:disable-next-line:triple-equals
        if ((this.listFeedbackNotPagination.length % 10) != 0) {
          this.totalPagination = (Math.round(this.listFeedbackNotPagination.length / 10)) + 1;
        }
        console.log(this.totalPagination);
      }
    });
  }

  indexPaginationChange(value: number) {
    this.indexPagination = value;
    this.feedbackService.getAll(this.indexPagination ).subscribe(feedbackList => {
      this.feedbackList = feedbackList['content'];
      this.totalPagination = feedbackList['totalPages'];
    });
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.feedbackService.getAll(this.indexPagination ).subscribe(feedbackList => {
      this.feedbackList = feedbackList['content'];
      this.totalPagination = feedbackList['totalPages'];
      console.log(this.indexPagination);
      console.log(this.feedbackList);
    });
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination === 0) {
      this.indexPagination = 0;
      this.ngOnInit();
    } else {
      this.feedbackService.getAll(this.indexPagination).subscribe(feedbackList => {
        this.feedbackList = feedbackList['content'];
        this.totalPagination = feedbackList['totalPages'];
      });
    }
  }

}
