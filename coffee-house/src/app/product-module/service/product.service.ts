import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../../model/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
URLPRODUCT = 'http://localhost:8080/product';

  constructor(private http: HttpClient) { }
 findByAll(): Observable<Product[]>{
    return this.http.get<Product[]>(this.URLPRODUCT);
}
deleteById(id: any): Observable<any>{
    return this.http.delete<any>(this.URLPRODUCT + '/' + id );
}
search(code: string, name: string): Observable<Product[]>{
    return this.http.get<Product[]>(this.URLPRODUCT + '/search?code=' + code + '&name=' + name);
}
}
