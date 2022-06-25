import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import { Router} from '@angular/router';
import { TokenStorageService } from 'src/app/login-module/service/token-storage.service';

@Component({
  selector: 'change-password-employee',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword:  ['', Validators.required],
      newPassword:  ['', Validators.required],
      reNewPassword:  ['', Validators.required]
    });
  }

  changePassSubmit() {
    if (!this.changePasswordForm.valid) {
      return;
    }

    const { username } = this.tokenStorageService.getUser();
    const {oldPassword, newPassword, reNewPassword} = this.changePasswordForm.value;

    if (newPassword != reNewPassword) {
      // Show message newPassword and reNewPassword not same
      return;
    }

    const params = {
      userName: username,
      password: newPassword,
      oldPassword: oldPassword
    }
    
    this.employeeService.changePassword(params)
      .subscribe((response: any) => {
        console.log(response);
      }
    );
  }
}
