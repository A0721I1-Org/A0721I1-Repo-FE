import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee';
const URL_API = 'http://localhost:8080/api/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) { }
  // HauLST
  findByIdUser(idUser: number): Observable<Employee> {
    // @ts-ignore
    return this.httpClient.get(URL_API + '/detail/' + idUser);
  }
}
