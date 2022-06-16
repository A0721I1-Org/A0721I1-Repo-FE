import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Table} from '../../model/table';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private _message:String;

  get messsge(): String {
    return this._message;
  }

  set message(value: String) {
    this._message = value;
  }

  constructor(private http: HttpClient) { }

  findAllTable(): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL + '/manager/findAllTableWithSearch');
  }

  findAllTableByCodeTable(codeTable: string): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?codeTable=' + codeTable);
  }

  findAllTableByIdStatusAndEmptyTable(idStatus: string, emptyTable: string): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?idStatus=' + idStatus + '&emptyTable=' + emptyTable);
  }

  findAllTableByIdStatus(idStatus: string): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?idStatus=' + idStatus);
  }

  findAllTableByEmptyTable(emptyTable: string): Observable<Table[]> {
    return this.http.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?emptyTable=' + emptyTable);
  }

  updateEmptyTable(id: number, table: Table): Observable<Table> {
    return this.http.put<Table>(API_URL + '/manager/updateEmptyTable/' + id, table);
  }

  deleteTable(id: number):Observable<Table> {
    return this.http.delete<Table>(API_URL + '/manager/deleteTable/' + id);
  }

  findTableById(id: number):Observable<Table> {
    return this.http.get<Table>(API_URL + '/manager/findTableById/' + id);
  }
}
