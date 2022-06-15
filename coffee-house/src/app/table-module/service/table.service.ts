import {OrderDetailMenuDTO} from '../../model/OrderDetailMenuDTO';
import {Oder} from '../../model/oder';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../../model/status';
import {Table} from '../../model/table';

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

  constructor(private _httpClient: HttpClient) {
  }

  /*
    //Bin code all Method of Empty Table
  */
  getAllStatusTable(): Observable<Table[]> {
    return this._httpClient.get<Table[]>(API_URL + '/emptyTable');
  }

  getOrderDetailMenuDTO(id: number): Observable<OrderDetailMenuDTO[]> {
    return this._httpClient.get<OrderDetailMenuDTO[]>(`${API_URL}/emptyTable/detailTable/${id}`);
  }

  addNewOrder(idEmployee: number, idTable: number): Observable<any> {
    // return this.httpClient.post(this.URL_API + '/saveOrderInTable/', idEmployee + '/' + idTable);
    // @ts-ignore
    return this._httpClient.post<any>(`${API_URL}/emptyTable/saveOrderInTable/${idEmployee}/${idTable}`);
  }

  cancelTable(idTable: number): Observable<Oder> {
    return this._httpClient.delete<Oder>(API_URL + '/emptyTable/deleteOrderInTable/' + idTable);
  }

  /* //Quang code getAllStatus*/
  getAllStatus(): Observable<Status[]> {
    return this._httpClient.get<Status[]>(API_URL + '/findAllStatus');
  }

  getAllTable(): Observable<Table[]> {
    return this._httpClient.get<Table[]>(API_URL + '/findAllTable');
  }

  createTable(table: Table): Observable<Table> {
    return this._httpClient.post<Table>(API_URL + '/createTable', table);
  }

  checkId(id: String): Observable<Table[]> {
    return this._httpClient.get<Table[]>(API_URL + '/checkId?id=' +id);
  }

}
