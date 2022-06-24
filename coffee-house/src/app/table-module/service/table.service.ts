import {OrderDetailMenuDTO} from '../../model/OrderDetailMenuDTO';
import {Oder} from '../../model/oder';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Status} from '../../model/status';
import {Table} from '../../model/table';
import {environment} from '../../../environments/environment';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class TableService {

  constructor(private httpClient: HttpClient) { }

  private _message:String;

  get messsge(): String {
    return this._message;
  }

  set message(value: String) {
    this._message = value;
  }

  /*
  HuyNN findAllTableWithSearch, updateEmptyTable, deleteTable, findTableById method
  */
  findAllTable(pageNumber: number): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearchAndPaging?page=' + pageNumber);
  }


  findAllTableByCodeTable(codeTable: string, pageNumber: number): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearchAndPaging?codeTable=' + codeTable + '&page=' + pageNumber);
  }

  findAllTableByIdStatusAndEmptyTable(idStatus: string, emptyTable: string, pageNumber: number): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearchAndPaging?idStatus=' + idStatus + '&emptyTable=' + emptyTable + '&page=' + pageNumber);
  }

  findAllTableByIdStatus(idStatus: string, pageNumber: number): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearchAndPaging?idStatus=' + idStatus + '&page=' + pageNumber);
  }

  findAllTableByEmptyTable(emptyTable: string, pageNumber: number): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTableWithSearchAndPaging?emptyTable=' + emptyTable + '&page=' + pageNumber);
  }

  deleteTable(id: number):Observable<Table> {
    return this.httpClient.delete<Table>(API_URL + '/manager/deleteTable/' + id);
  }

  findTableById(id: number):Observable<Table> {
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
    return this.httpClient.post<any>(`${API_URL}/manager/emptyTable/saveOrderInTable/${idEmployee}/${idTable}/${dateOrder}`);
  }

  cancelTable(idTable: number): Observable<Oder> {
    return this.httpClient.delete<Oder>(API_URL + '/manager/emptyTable/deleteOrderInTable/' + idTable);
  }

  /* //Quang code getAllStatus*/
  getAllStatus(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(API_URL + '/manager/findAllStatus');
  }

  getAllTable(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(API_URL + '/manager/findAllTable');
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
    return this.httpClient.get<Table[]>(API_URL + '/manager/checkId?id=' +id);
  }
}
