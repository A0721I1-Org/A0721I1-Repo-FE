import {Component, OnInit} from '@angular/core';
import {Employee} from "../../model/employee";
import {EmployeeService} from "../service/employee.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employeeList: Employee[] = [];
  employee: Employee;
  searchForm: FormGroup;

  constructor(private employeeService: EmployeeService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.searchForm = new FormGroup({
      username: new FormControl(''),
      name: new FormControl(''),
      phone: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getListEmployee();
  }

  getListEmployee() {
    this.employeeService.getAllEmployee().subscribe(data => {
      this.employeeList = data;
    })
  }

  deteleEmployee(idEmployee: number) {
    this.employeeService.deleteEmployee(idEmployee).subscribe(data => {
      this.ngOnInit();
    })
  }

  getEmployeeById(idEmployee: number) {
    this.employeeService.findByIdUser(idEmployee).subscribe(data => {
      this.employee = data;
    })
  }

  searchEmployee() {
    let username = this.searchForm.value.username
    let name = this.searchForm.value.name
    let phone = this.searchForm.value.phone
    if (username == "") {
      username = "null"
    }
    if (name == "") {
      name = "null"
    }
    if (phone == "") {
      phone = "null"
    }
    this.employeeService.searchEmployee(username, name, phone).subscribe(data => {
      this.employeeList = data;
    })
  }
}
