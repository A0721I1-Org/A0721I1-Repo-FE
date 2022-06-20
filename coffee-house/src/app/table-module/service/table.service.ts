import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../../model/status';
// @ts-ignore
import {Table} from '../../model/table';
import {OrderDetailMenuDTO} from '../../model/OrderDetailMenuDTO';
import {Oder} from '../../model/oder';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TableService {

  constructor(private httpClient: HttpClient) {
  }

  private _message: String;


  get message(): String {
    return this._message;
  }

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

  addNewOrder(idEmployee: number, idTable: number): Observable<Oder> {
    return this.httpClient.post<Oder>(`${API_URL}/manager/emptyTable/saveOrderInTable/${idEmployee}/${idTable}` , {});
  }

  cancelTable(idTable: number): Observable<Oder> {
    return this.httpClient.delete<Oder>(API_URL + '/manager/emptyTable/deleteOrderInTable/' + idTable);
  }

  /* Bin TK */
  payment(idTable: number): Observable<any> {
    // @ts-ignore
    return this.httpClient.patch<any>(`${API_URL}/menu/table/${idTable}/payment`);
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

  checkId(id: String): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/checkId?id=' + id);
  }
}
