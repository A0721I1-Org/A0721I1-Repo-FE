import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../model/employee';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.css']
})
export class DetailEmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router ) { }
  idUser: number;
  employee: Employee;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idUser = +param.get('userRoutes');
      // @ts-ignore
      this.employee = this.employeeService.findByIdUser(this.idUser).subscribe(
        (data) => {
          this.employee = data;
        },
      () => {},
      () => {
          console.log(this.employee);
      }
      );
    });
  }

}
