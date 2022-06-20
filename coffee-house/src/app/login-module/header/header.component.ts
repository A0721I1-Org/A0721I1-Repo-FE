import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {Router, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public tokenStorageService: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login/authentication');
  }
}
