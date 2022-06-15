import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080/manager';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../../model/status';
// @ts-ignore
import {Table} from '../../model/table';


@Injectable({
  providedIn: 'root'
})

export class TableService {
  constructor(
    // tslint:disable-next-line:variable-name
    private _httpClient: HttpClient
  ) { }

  // Quang code getAllStatus
  getAllStatus(): Observable<Status[]>{
  return this._httpClient.get<Status[]>(API_URL + '/findAllStatus');
  }

  getAllTable(): Observable<Table[]>{
    return this._httpClient.get<Table[]>(API_URL + '/findAllTable');
  }

  createTable(table: Table): Observable<Table>{
    return this._httpClient.post<Table>(API_URL + '/createTable', table);
  }
  getTableById(id): Observable<Table>{
    return this._httpClient.get<Table>(`${API_URL}/findTableById/${id}`);
  }
  updateTable(id, table: Table): Observable<Table>{
    return this._httpClient.put<Table>(`${API_URL}/updateTable/${id}`, table);
  }
}
