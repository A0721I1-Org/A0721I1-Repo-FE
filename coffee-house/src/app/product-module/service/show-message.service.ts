import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ShowMessageService {

  constructor(private remind: ToastrService) {
  }

  showMessageCreateSuccessfully() {
    this.remind.success('Thêm mới thành công.', 'Thông báo: ');
  }

  showMessageFail() {
    this.remind.success('Thêm mới thất bại.', 'Thông báo: ');
  }

  showMessageUndo() {
    this.remind.success('Huỷ sửa món.', 'Thông báo: ');
  }

  showMessageCreateSuccessUndo() {
    this.remind.success('Huỷ thêm món.', 'Thông báo: ');
  }
}
