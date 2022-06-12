import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../../model/status";
import {Table} from "../../model/table";

const API_URL = 'http://localhost:8080/manager';

@Injectable({
  providedIn: 'root'
})

export class TableService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  //Quang code getAllStatus
  getAllStatus() :Observable<Status[]>{
  return this._httpClient.get<Status[]>(API_URL + '/findAllStatus');
  }

  getAllTable(): Observable<Table[]>{
    return this._httpClient.get<Table[]>(API_URL + '/findAllTable');
  }

  createTable(table: Table) :Observable<Table>{
    return this._httpClient.post<Table>(API_URL + '/createTable', table);
  }

}
