import { Injectable } from '@angular/core';
import {OderDetail} from "../../model/oderDetail";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/product";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private API_URL = 'http://localhost:8080/api/products';
  private API_URL_ORDER_DETAIL = 'http://localhost:8080/api/order-detail';
  product: Product | undefined;
  // tslint:disable-next-line:variable-name
  constructor(private _httpClient: HttpClient) {
  }
  // Lay danh sach product
  getAllProduct(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.API_URL);
  }
  // Lay product theo id
  findByIdProduct(id: number): Observable<Product>{
    return this._httpClient.get<Product>(this.API_URL + '/' + id);
  }
  // get OrderDetail by id
  findByIdOrderDetail(id: number): Observable<OderDetail>{
    return this._httpClient.get<OderDetail>(this.API_URL_ORDER_DETAIL + '/' + id);
  }
  // save OrdeDetail
  saveOrderDetail(orderDetail: OderDetail): Observable<OderDetail> {
    return this._httpClient.post<OderDetail>(this.API_URL_ORDER_DETAIL, orderDetail);
  }
  // edit OrderDetail
  editOrderDetail(orderDetail: OderDetail): Observable<void> {
    return this._httpClient.patch<void>(this.API_URL_ORDER_DETAIL + '/' + orderDetail.idOrderDetail, orderDetail);
  }
  // delete OrderDetail
  deleteOrderDetail(id: number): Observable<OderDetail> {
    return this._httpClient.delete(this.API_URL_ORDER_DETAIL + '/' + id);
  }
}
