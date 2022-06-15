import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  URLPRODUCT = 'http://localhost:8080/product';

  constructor(private http: HttpClient) {
  }

  findByAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.URLPRODUCT);
  }

  findByAllPaginng(page: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.URLPRODUCT + '/page' + '?page=' + page);
  }

  deleteById(id: any): Observable<any> {
    return this.http.delete<any>(this.URLPRODUCT + '/' + id);
  }

  search(code: string, name: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.URLPRODUCT + '/search?code=' + code + '&name=' + name);
  }

  searchPage(code: string, name: string, page1: number): Observable<Product[]> {
    return this.http.get<Product[]>(this.URLPRODUCT + '/searchPage?code=' + code + '&name=' + name + '&page1=' + page1);
  }
}
