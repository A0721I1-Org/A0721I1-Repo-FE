import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Table} from '../../model/table';
import {HttpClient} from '@angular/common/http';
import {Status} from '../../model/status';
const API_URL = 'localhost:8080/manager';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  constructor(private httpClient: HttpClient) { }



}
