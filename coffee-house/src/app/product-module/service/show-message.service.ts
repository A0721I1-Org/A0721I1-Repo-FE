import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private remind: ToastrService) {
  }

  showMessageCreateSuccessfully() {
    this.remind.success('Thêm mới thành công', 'Thông báo: ');
  }

}
