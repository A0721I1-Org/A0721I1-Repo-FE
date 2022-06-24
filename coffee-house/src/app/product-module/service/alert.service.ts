import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private remain: ToastrService) { }
  showMessage(message){
    this.remain.success(message, 'Thông báo:');
  }
}
