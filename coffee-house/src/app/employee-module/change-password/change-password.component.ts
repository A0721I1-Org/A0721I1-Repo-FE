import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../service/employee.service';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'change-password-employee',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  userId;
  message = '';

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.userId = Number(paramMap.get('id'));
    });
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

    const {oldPassword, newPassword, reNewPassword} = this.changePasswordForm.value;

    if (newPassword != reNewPassword) {
      // Show message newPassword and reNewPassword not same
      this.message = "Mật khẩu nhập lại phải giống với mật khẩu cũ";
      return;
    }

    const params = {
      userId: this.userId,
      password: newPassword,
      oldPassword: oldPassword
    }
    
    this.employeeService.changePassword(params)
      .subscribe(
        () => {
        },
        (res) => {
          this.message = "Thay đổi password thành công"
        },
        () => {
        },
    );
  }

  back() {
    this.router.navigateByUrl('/employee/detail/' + this.userId);
  }
}
