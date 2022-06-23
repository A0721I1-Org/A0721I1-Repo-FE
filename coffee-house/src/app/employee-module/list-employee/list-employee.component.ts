import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../../model/employee';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  employee: Employee;
  searchForm: FormGroup;
  emptyForm = false;
  allow = false;
  message = this.employeeService.message;
  p = 0;
  dataTarget: string;

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getListEmployee();
    this.searchForm = new FormGroup({
      username: new FormControl(''),
      name: new FormControl(''),
      phone: new FormControl('')
    });
  }

  getListEmployee() {
    this.employeeService.getAllEmployee().subscribe(data => {
      this.employeeList = data;
    });
  }

  deleteEmployee(idEmployee: number) {
    this.employeeService.findByIdEmployee(idEmployee).subscribe(data => {
      if (data.idEmployee === idEmployee){
        this.dataTarget = 'deleteSuccess';
        this.employeeService.deleteEmployee(idEmployee).subscribe(next => {
          this.ngOnInit();
        });
      }
    })
  }

  getEmployeeById(idEmployee: number) {
    this.employeeService.findByIdEmployee(idEmployee).subscribe(data => {
      this.employee = data;
    });
  }

  searchEmployee() {
    let username = this.searchForm.value.username;
    let name = this.searchForm.value.name;
    let phone = this.searchForm.value.phone;
    if (username === '') {
      username = 'null';
    }
    if (name === '') {
      name = 'null';
    }
    if (phone === '') {
      phone = 'null';
    }
    if (username === 'null' && name === 'null' && phone === 'null') {
      this.emptyForm = true;
    } else {
      this.emptyForm = false;
      this.employeeService.searchEmployee(username, name, phone).subscribe(data => {
        this.employeeList = data;
      });
    }
  }

  resetPage(){
    this.ngOnInit();

  }
}
