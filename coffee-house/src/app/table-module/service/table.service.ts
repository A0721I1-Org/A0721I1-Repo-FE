import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Table} from '../../model/table';
import {OrderDetailMenuDTO} from '../../model/OrderDetailMenuDTO';
import {Oder} from '../../model/oder';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  URL_API = 'http://localhost:8080/manager/emptyTable';

  constructor(private httpClient: HttpClient) {
  }

  getAllStatusTable(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(this.URL_API);
  }

  getOrderDetailMenuDTO(id: number): Observable<OrderDetailMenuDTO[]> {
    return this.httpClient.get<OrderDetailMenuDTO[]>(`${this.URL_API}/detailTable/${id}`);
  }

  addNewOrder(idEmployee: number, idTable: number): Observable<any> {
    // return this.httpClient.post(this.URL_API + '/saveOrderInTable/', idEmployee + '/' + idTable);
    // @ts-ignore
    return this.httpClient.post<any>(`${this.URL_API}/saveOrderInTable/${idEmployee}/${idTable}`);
  }

  cancelTable(idTable: number): Observable<Oder> {
    return this.httpClient.delete<Oder>(this.URL_API + '/deleteOrderInTable/' + idTable);
  }
}
