import {Component, OnInit} from '@angular/core';
import {TableService} from "../service/table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../model/status";
import {
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Table} from "../../model/table";
import {checkCodeTable} from "./validate/ValidateCodeTable";

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  status: Status[];
  tableForm: FormGroup;
  tableCreate: Table;
  check: boolean = true;
  messageAlert: String[];

  constructor(
    private _service: TableService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.tableForm = new FormGroup(
      {
        idTable: new FormControl('',),
        codeTable: new FormControl('', [Validators.required, Validators.pattern('^TB[0-9]{3}$')], [checkCodeTable(this._service)]),
        emptyTable: new FormControl('true'),
        status: new FormControl('', [Validators.required])
      }
    )
    // Method get status
    this._service.getAllStatus().subscribe(data => {
      this.status = data;
      console.log(data);
    }, error => {
      console.log("errors");
    })
  }

// method create table Quang NV
  createTable() {
    this.messageAlert = [];
    if (this.tableForm.invalid) {
      if (this.tableForm.get('codeTable')?.errors?.required || this.tableForm.get('status')?.errors?.required)
        this.messageAlert.push("Bạn phải nhập đầy đủ thông tin!");
      if (this.tableForm.get('codeTable')?.errors?.checkCodeTable) {
        this.messageAlert.push("CodeTable " + this.tableForm.value.codeTable + " đã tồn tại!");
      }
      document.getElementById("noti").hidden = false;
    } else {
      this.tableCreate = this.tableForm.value;
      for (let i = 0; i < this.status.length; i++) {
        if ((this.tableCreate.status) == (this.status[i].idStatus)) {
          this.tableCreate.status = this.status[i];
        }
      }
      this._service.createTable(this.tableCreate).subscribe(() => {
        console.log("success");
        this._service.message = "Tạo mới thành công!"
        this._router.navigateByUrl('/table/list');
      }, err => {
        console.log("err");
        console.log(err.error.message);
      })
    }
  }

  returnList() {
    this._service.message = "Tạo mới thất bại!"
    this._router.navigateByUrl('/table/list');
  }

  hide() {
    document.getElementById("noti").hidden = true;
  }
}
