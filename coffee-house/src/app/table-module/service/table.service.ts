import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../../model/status';
// @ts-ignore
import {Table} from '../../model/table';
import {OrderDetailMenuDTO} from '../../model/OrderDetailMenuDTO';
import {Oder} from '../../model/oder';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiBaseUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TableService {

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:variable-name ban-types
  private _message: String;


  // tslint:disable-next-line:ban-types
  get message(): String {
    return this._message;
  }

  // tslint:disable-next-line:ban-types
  set message(value: String) {
    this._message = value;
  }

  /*
  HuyNN findAllTableWithSearch, updateEmptyTable, deleteTable, findTableById method
*/
  findAllTable(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearch');
  }

  findAllTableByCodeTable(codeTable: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?codeTable=' + codeTable);
  }

  findAllTableByIdStatusAndEmptyTable(idStatus: string, emptyTable: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?idStatus=' + idStatus + '&emptyTable=' + emptyTable);
  }

  findAllTableByIdStatus(idStatus: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?idStatus=' + idStatus);
  }

  findAllTableByEmptyTable(emptyTable: string): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearch?emptyTable=' + emptyTable);
  }

  deleteTable(id: number): Observable<Table> {
    return this.httpClient.delete<Table>(API_URL + '/manager/deleteTable/' + id);
  }

  findTableById(id: number): Observable<Table> {
    return this.httpClient.get<Table>(API_URL + '/manager/findTableById/' + id);
  }

  /*
    //Bin code all Method of Empty Table
  */
  getAllStatusTable(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/emptyTable');
  }

  getOrderDetailMenuDTO(id: number): Observable<OrderDetailMenuDTO[]> {
    return this.httpClient.get<OrderDetailMenuDTO[]>(`${API_URL}/manager/emptyTable/detailTable/${id}`);
  }

  addNewOrder(idEmployee: number, idTable: number, dateOrder: string): Observable<any> {
    // return this.httpClient.post(this.URL_API + '/saveOrderInTable/', idEmployee + '/' + idTable);
    // @ts-ignore
    return this.httpClient.post<any>(`${API_URL}/manager/emptyTable/saveOrderInTable?idUser=${idEmployee}&idTable=${idTable}`);
  }

  cancelTable(idTable: number): Observable<Oder> {
    return this.httpClient.delete<Oder>(API_URL + '/manager/emptyTable/deleteOrderInTable/' + idTable);
  }

  /* //Quang code getAllStatus*/
  getAllStatus(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(API_URL + '/manager/findAllStatus');
  }

  getTableById(id): Observable<Table> {
    return this.httpClient.get<Table>(`${API_URL}/manager/findTableById/${id}`);
  }

  updateTable(id, table: Table): Observable<Table> {
    return this.httpClient.put<Table>(`${API_URL}/manager/updateTable/${id}`, table);
  }

  createTable(table: Table): Observable<Table> {
    return this.httpClient.post<Table>(API_URL + '/manager/createTable', table);
  }

  // tslint:disable-next-line:ban-types
  checkId(id: String): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/checkId?id=' + id);
  }
}
