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

  /* Define size for pagination */
  currentPage = 0;
  sizePage = this.employeeService.sizePage;
  totalPageArray: Array<any>;
  activatedButton: number;
  private totalPage: number;
  private totalPageSurplus: number;

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
      this.employeeList = data
    })

    this.employeeService.getLengthOfEmployees().subscribe(data => {
      this.pagination(data);
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

  /* Pagination */
  pagination(lengthEmployee: number) {
    this.totalPage = Math.floor(lengthEmployee / this.sizePage);
    this.totalPageSurplus = Math.floor(lengthEmployee % this.sizePage);
    if (this.totalPageSurplus != 0) {
      this.totalPageArray = Array(this.totalPage + 1).fill(1).map((x, i) => i);
    } else {
      this.totalPageArray = Array(this.totalPage).fill(1).map((x, i) => i);
    }
  }


  redirectPagination(tg: any) {
    /* Get amounts of all products */
    tg -= 1;
    this.currentPage = tg;

    this.employeeService.redirectPagination(this.currentPage);

    /* Check location current page */
    this.checkActiveButton(this.currentPage * this.sizePage);

    /* Set default value for next and prev */
    this.currentPage = tg * this.sizePage;
    this.getListEmployee();
  }

  prevPage() {
    this.currentPage -= this.sizePage;
    this.employeeService.prevPage();
    this.getListEmployee();

    /* Check location current page */
    this.checkActiveButton(this.currentPage);
  }

  nextPage() {
    this.currentPage += this.sizePage;
    this.employeeService.nextPage();
    this.getListEmployee();

    /* Check location current page */
    this.checkActiveButton(this.currentPage);
  }

  private checkActiveButton(currentPage: number) {
    console.log(currentPage)
    this.activatedButton = Math.round(currentPage / this.sizePage) + 1;
    console.log(this.activatedButton)
  }
}
