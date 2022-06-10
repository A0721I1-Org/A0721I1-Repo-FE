import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {User} from '../../model/user';
import {LoginServiceService} from '../service/login.service';
import {TokenStorageService} from '../service/token-storage.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: User;
  formLogin: FormGroup;
  errorMessage = '';
  userList: User[];
  roles: string[] = [];
  show = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router, private loginServer: LoginServiceService,
              private activatedRoute: ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private toast: ToastrService) {

  }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
        username: [''],
        password: [''],
        remember_me: ['']
      }
    );
    // this.formLogin = new FormGroup({
    //   username: new FormControl(),
    //   password: new FormControl(),
    //   remember_me: new FormControl()
    // });

    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.loginServer.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      const accessToken = this.tokenStorageService.getToken();
    }
  }

  login() {
    console.log(this.formLogin.value);
    console.log(this.formLogin.value.remember_me);
    this.loginServer.login(this.formLogin.value).subscribe(
      (data) => {
        if (this.formLogin.value.remember_me) {
          this.tokenStorageService.saveTokenLocal(this.formLogin.value.remember_me);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(this.formLogin.value.remember_me);
          this.tokenStorageService.saveUserLocal(data);
        }

        this.loginServer.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.formLogin.reset();
        this.router.navigateByUrl('/menu/menu-order-child');
      },
      err => {
        // this.errorMessage = err.error.message;
        this.loginServer.isLoggedIn = false;
        this.toast.error('Sai tên đăng nhập hoặc mật khẩu hoặc tài khoản chưa được kích hoạt', 'Đăng nhập thất bại: ', {
          timeOut: 3000,
          extendedTimeOut: 1500
        });
      }
    );
  }

  showPsw() {this.show = !this.show; }
}
