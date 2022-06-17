import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Product} from '../../model/product';
const API_URL = "http://localhost:8080/find";
const API_URL1 = "http://localhost:8080/cart";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _httpClient: HttpClient) {
  }

  findAllNew(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(API_URL);
  }
  findAllCart(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(API_URL1);
  }
}

