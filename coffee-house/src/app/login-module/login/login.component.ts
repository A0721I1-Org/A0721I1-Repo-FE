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
  rememberMeToken: string;

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
    // if (this.tokenStorageService.getToken()) {
    //   const user = this.tokenStorageService.getUser();
    //   this.loginServer.isLoggedIn = true;
    //   this.roles = this.tokenStorageService.getUser().roles;
    //   this.username = user.username;
    //   const accessToken = this.tokenStorageService.getToken();
    //   this.formLogin = this.formBuilder.group({
    //       username: [user.username || ''],
    //       password: [user.password || ''],
    //       remember_me: ['']
    //     }
    //   );
    //   console.log(this.formLogin.value);
    // }
  }

  login() {
    this.formLogin.value.remember_me = this.tokenStorageService;
    this.loginServer.login(this.formLogin.value).subscribe(
      (data) => {
        if (this.formLogin.value) {
          this.tokenStorageService.saveTokenLocal(this.formLogin.value.remember_me);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(this.formLogin.value.remember_me);
          this.tokenStorageService.saveUserLocal(data);
        }
        this.loginServer.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.rememberMeToken = this.tokenStorageService.getToken();
        this.formLogin.reset();
        this.router.navigateByUrl('/home');
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

  rememberMe(event) {
    console.log(event.target.checked);
    if (event.target.checked === true){
      console.log(this.rememberMeToken);
      localStorage.setItem('remember_me', this.tokenStorageService.getToken());
    } else {
      localStorage.removeItem('remember_me');
    }
  }
}
