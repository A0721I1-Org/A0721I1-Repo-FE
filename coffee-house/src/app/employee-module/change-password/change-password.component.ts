import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'change-password-employee',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  // editEmployeeForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  //   this.editEmployeeForm = this.formBuilder.group({
  //     idEmployee: ['', ],

  //     nameEmployee: ['', [Validators.required,Validators.pattern(/^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ' ]+$/)]],
  //     addressEmployee:  ['', Validators.required],
  //     phoneEmployee: ['', [Validators.required,Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]],
  //     genderEmployee:  ['', Validators.required],
  //     dateOfBirthEmployee:  ['', [Validators.required,checkAgeEdit]],
  //     salaryEmployee: ['', [Validators.required]],
  //     position:  ['', Validators.required],
  //     user:  ['', [Validators.required,Validators.minLength(6 ), Validators.pattern(/^(?!.*admin)+(?!.*root).*$/)]],
  //   });
  }
}
