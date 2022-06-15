import { Injectable } from '@angular/core';
import {OderDetail} from "../../model/oderDetail";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../../model/product";
import {TypeProduct} from "../../model/typeProduct";
import {MenuOrderDTO} from "../../model/MenuOrderDTO";

const API_URL = "http://localhost:8080/menu"

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
  /* Define size page and current page */
  currentPage:number = 0;
  sizePage:number = 4;

  /* Size page for table */
  currentPageTable: number = 0;
  sizePageTable: number = 4;

  /* Next and prev */
  nextPage(currentPage: number , checkPage: boolean) {
    if(checkPage) {
      this.currentPage = currentPage;
    } else {
      this.currentPageTable += 1;
    }
  }

  prevPage(currentPage: number, checkPage: boolean) {
    if(checkPage) {
      this.currentPage = currentPage;
    } else {
      this.currentPageTable -= 1;
    }
  }

  redirectPagination(currentPage: number , checkPage: boolean) {
    if(checkPage) {
      this.currentPage = currentPage;
    } else {
      this.currentPageTable = currentPage;
    }
  }

  /* Set default current page */
  getTypeOfGet() {
    this.currentPage = 0;
  }

  /* Get all product and pagination */
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${API_URL}/current=${this.currentPage}&size=${this.sizePage}`);
  }

  /* Get product by product type id */
  getProductByTypeId(typeId: number):Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${API_URL}/product-type/${typeId}/${this.currentPage}&${this.sizePage}`);
  }

  /* Get all type products */
  getTypeProducts(): Observable<TypeProduct[]> {
    return this.httpClient.get<TypeProduct[]>(`${API_URL}/product-type`);
  }

  /* Get amount of products */
  getAmountOfProducts():Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/amount-products`);
  }

  /* Get amount products by id type*/
  getAmountOfProductsByIdType(idType: number):Observable<number> {
    return this.httpClient.get<number>(`${API_URL}/amount-products/idType=${idType}`);
  }

  /* Get data DTO for table */
  getDataDTOForTable(idTable: number):Observable<MenuOrderDTO[]> {
    return this.httpClient.get<MenuOrderDTO[]>(`${API_URL}/table/${idTable}/${this.currentPageTable}&${this.sizePageTable}`);
  }

  constructor(private httpClient: HttpClient) { }
}
