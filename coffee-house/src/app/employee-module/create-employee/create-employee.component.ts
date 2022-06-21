import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../service/employee.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Position} from '../../model/position';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  positions: Position[] = [];
  createEmployeeForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.createEmployeeForm = new FormGroup({
      nameEmployee: new FormControl('', [Validators.required, Validators.pattern(/^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$/)]),
      addressEmployee: new FormControl('', Validators.required),
      phoneEmployee: new FormControl('', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]),
      genderEmployee: new FormControl('', Validators.required),
      dateOfBirthEmployee: new FormControl('', Validators.required),
      salaryEmployee: new FormControl('', [Validators.required, Validators.min(100000)]),
      position: new FormControl('', Validators.required),
      user: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]),
    });

    this.getAllPosition();
  }


  getAllPosition() {
    this.employeeService.getPosition().subscribe(
      next => {
        this.positions = next;
        console.log(this.positions);
      }
    );
  }

  createSubmit() {
    console.log('aaaaaa');
    if (this.createEmployeeForm.valid) {
      console.log('bbbbbbbbb');
      const employee = this.createEmployeeForm.value;
      const user = {
        username: employee.user,
        password: '123456',
      };
      employee.user = user;
      console.log(employee);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.positions.length; i++) {
        // tslint:disable-next-line:triple-equals
        if ((employee.position) == (this.positions[i].idPosition)) {
          employee.position = this.positions[i];
        }
      }
      this.employeeService.createEmployee(employee).subscribe(
        () => {

        },
        () => {

        },
        () => {
          this.router.navigateByUrl('/employee/list');
        },
      );
    }
  }
}
