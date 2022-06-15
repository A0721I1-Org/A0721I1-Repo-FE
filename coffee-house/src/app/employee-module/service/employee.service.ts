import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../../model/employee';

const URL_API = 'http://localhost:8080/manager/api/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient: HttpClient) {
  }

  // HauLST
  findByIdUser(idUser: number): Observable<Employee> {
    // @ts-ignore
    return this.httpClient.get(URL_API + '/detail/' + idUser);
  }
  //VinhTQ
  getAllEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(URL_API+'/list');
  }
  //VinhTQ
  deleteEmployee(idUser: number): Observable<Employee> {
    console.log(URL_API+'/delete/'+idUser)
    return this.httpClient.delete<Employee>(URL_API+'/delete/'+idUser);
  }
  //VinhTQ
  searchEmployee(username: string, name : string, phone : string): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(URL_API+'/search/'+username+'/'+name+'/'+phone);
  }
}
