import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Feedback} from "../../model/feedback";
const API_URL = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  saveFeedback(feedBack) {
    return this.http.post<Feedback>(API_URL + "/api/feedback/createFeedback", feedBack);
  }
}
