import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {
  URL_API = 'http://localhost:8080/manager/api/income';

  constructor(private httpClient: HttpClient) { }

  sumTotalOrderDay(): Observable<number>{
    return this.httpClient.get<number>(this.URL_API + '/day');
  }

  sumTotalOrderWeek(): Observable<number>{
    return this.httpClient.get<number>(this.URL_API + '/week');
  }

  sumTotalOrderMonth(): Observable<number>{
    return this.httpClient.get<number>(this.URL_API + '/month');
  }

  sumTotalOrderYear(): Observable<number>{
    return this.httpClient.get<number>(this.URL_API + '/year');
  }

  // sumTotalOrderDayToDay(): Observable<number>{
  //   return  this.httpClient.get<number>(this.URL_API + 'daytoday');
  // }
}
