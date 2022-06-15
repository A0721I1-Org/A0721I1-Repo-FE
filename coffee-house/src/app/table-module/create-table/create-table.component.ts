import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TableService} from "../service/table.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Status} from "../../model/status";
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Table} from "../../model/table";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {
  checkSubmit:Boolean = false;
  status: Status[];
  tableForm: FormGroup;
  tableCreate: Table;
  check: boolean = true;
  messageErr: string;
  messageAlert:String[];
  table: Table[] = [];
  @Output('message') massage = new EventEmitter<String>();

  constructor(
    private _service: TableService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.messageErr = '';
    // Method get all Table
    this.table = [];
    this._service.getAllTable().subscribe(data => {
      this.table = data;
    })
    this.tableForm = new FormGroup(
      {
        idTable: new FormControl('',),
        codeTable: new FormControl('', [Validators.required, Validators.pattern('^TB[0-9]{3}$')]),
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
    this.messageErr = '';

    if (this.tableForm.invalid){
      console.log(this.tableForm.value);
      this.messageAlert.push("Bạn phải nhập đầy đủ thông tin đúng định dạng!!!");
      document.getElementById("noti").hidden = false;
    }
    // checkId QuangNV
    if (this.table != null) {
      for (let i = 0; i < this.table.length; i++) {
        if ((this.table[i].codeTable) == (this.tableForm.value.codeTable)) {
          this.messageAlert.push("Code Table đã tồn tại, yêu cầu nhập lại");
          this.messageErr = "codeTable đã tồn tại!!!"
          document.getElementById("noti").hidden = false;
          this.check = false;
          console.log(this.check);
          break;
        }
      }
    }
    // Create save database QuangNV
    if (this.tableForm.valid) {
      // set Status table
      this.tableCreate = this.tableForm.value;
      for (let i = 0; i < this.status.length; i++) {
        if ((this.tableCreate.status) == (this.status[i].idStatus)) {
          this.tableCreate.status = this.status[i];
        }
      }
      // save table QuangNV
      this._service.createTable(this.tableCreate).subscribe(() => {
        console.log("success");
        this._service.mesage = "Tạo mới thành công!"
        this._router.navigateByUrl('/table/list');
      }, err => {
        console.log(err.error.message);
      })
    }
  }

  returnList() {
    this._service.mesage = "Tạo mới thất bại!"
    this._router.navigateByUrl('/table/list');
  }

  hide() {
    document.getElementById("noti").hidden = true;
  }
}
