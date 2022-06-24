import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee';
import {Position} from '../../model/position';

const URL_API = 'http://localhost:8080/manager/api/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  message: string;

  constructor(private httpClient: HttpClient) {
  }

  // HauLST
  findByIdUser(idUser: number): Observable<Employee> {
    // @ts-ignore
    return this.httpClient.get(URL_API + '/detail/' + idUser);
  }

  // VinhTQ
  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(URL_API + '/list');
  }

  // VinhTQ
  deleteEmployee(idUser: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(URL_API + '/delete/' + idUser);
  }

  // // VinhTQ
  searchEmployee(username: string, name: string, phone: string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(URL_API + '/search/' + username + '/' + name + '/' + phone);
  }

  /* VinhTQ */
  getLengthOfEmployees(): Observable<number> {
    return this.httpClient.get<number>(URL_API + '/length/list');
  }

  /* VinhTQ */
  getLengthOfEmployeeSearch(username: string, name: string, phone: string): Observable<number> {
    return this.httpClient.get<number>(URL_API + '/length/search/' + username + '/' + name + '/' + phone);
  }

  createEmployee(employee: Employee): Observable<void> {
    // @ts-ignore
    return this.httpClient.post(URL_API + '/create-employee', employee);
  }

  updateEmployee(employee: Employee): Observable<void> {
    // @ts-ignore
    return this.httpClient.put(URL_API + '/update-employee/' + employee.idEmployee, employee);
  }

  getPosition(): Observable<Position[]>{
    // @ts-ignore
    return this.httpClient.get(URL_API + '/position');
  }


  findByIdEmployee(id: number): Observable<Employee>{
    // @ts-ignore
    return this.httpClient.get(URL_API + '/find-id-employee/' + id);
  }
}
