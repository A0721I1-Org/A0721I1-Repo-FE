import { Injectable } from '@angular/core';
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
