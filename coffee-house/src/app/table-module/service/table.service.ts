import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Status} from "../../model/status";
import {Table} from "../../model/table";
import {delay} from "rxjs/operators";

const API_URL = 'http://localhost:8080/manager';

@Injectable({
  providedIn: 'root'
})

export class TableService {
  private _mesage: String;

  get mesage(): String {
    return this._mesage;
  }

  set mesage(value: String) {
    this._mesage = value;
  }

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  //Quang code getAllStatus
  getAllStatus(): Observable<Status[]> {
    return this._httpClient.get<Status[]>(API_URL + '/findAllStatus');
  }

  getAllTable(): Observable<Table[]> {
    return this._httpClient.get<Table[]>(API_URL + '/findAllTable');
  }

  createTable(table: Table): Observable<Table> {
    return this._httpClient.post<Table>(API_URL + '/createTable', table);
  }

  checkId(id: String): Observable<Boolean> {
    return this._httpClient.get<Boolean>(API_URL + '/checkId?id=' +id);
  }
}
