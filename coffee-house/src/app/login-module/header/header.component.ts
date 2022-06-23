import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {Router, RouterLinkActive} from '@angular/router';
import {Employee} from '../../model/employee';
import {ProductService} from '../../product-module/service/product.service';
import {EmployeeService} from '../../employee-module/service/employee.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  employee: Employee;
  idUser: number;
  isLogin = false;

  constructor(
    private service: ProductService,
    public tokenStorageService: TokenStorageService,
    private router: Router,
    private employeeService: EmployeeService
  ) {
  }

  ngOnInit(): void {
    this.isLogin = this.tokenStorageService.getUser().id ? true : false;
    console.log(this.isLogin);
    this.getPositionById();
  }


  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login/authentication');
  }

  getPositionById() {
    this.idUser = this.tokenStorageService.getUser().id;
    console.log(this.idUser);
    this.employeeService.findByIdUser(this.idUser).subscribe(
      (data) => {
        this.employee = data;
      }
    );
  }
}
