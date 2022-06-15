import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TableService} from '../service/table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Status} from '../../model/status';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Table} from '../../model/table';

@Component({
  selector: 'app-create-table',
  templateUrl: './create-table.component.html',
  styleUrls: ['./create-table.component.css']
})
export class CreateTableComponent implements OnInit {

  status: Status[];
  tableForm: FormGroup;
  tableCreate: Table;
  check = true;
  messageErr: string;
  table: Table[] = [];
  @Output('message') massage = new EventEmitter<String>();

  constructor(
    private _service: TableService,
    private _router: Router,
    private _activatedRouter: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // Method get all Table
    this.table = [];
    this._service.getAllTable().subscribe(data => {
      this.table = data;
    });

    this.tableForm = new FormGroup(
      {
        idTable: new FormControl('', ),
        codeTable: new FormControl('', [Validators.required, Validators.pattern('^TB[0-9]{3}$')]),
        emptyTable: new FormControl('true'),
        status: new FormControl('', [Validators.required])
      }
    );
    // Method get status
    this._service.getAllStatus().subscribe(data => {
      this.status = data;
      console.log(data);
    }, error => {
      console.log('errors');
    });
  }

// method create table
  createTable() {
    console.log(this.table);
    this.messageErr = '';
    //  Check Id
    if (this.table != null) {
      for (let i = 0; i < this.table.length; i++) {
        // tslint:disable-next-line:triple-equals
        if ((this.table[i].codeTable) == (this.tableForm.value.codeTable)) {
          this.check = false;
          console.log(this.check);
          break;
        }
      }
    }
    // Create save database
    if (this.check) {
      // set Status table
      this.tableCreate = this.tableForm.value;
      for (let i = 0; i < this.status.length; i++) {
        // @ts-ignore
        if ((this.tableCreate.status) == (this.status[i].idStatus)) {
          this.tableCreate.status = this.status[i];
        }
      }
      console.log(this.check);
      this._service.createTable(this.tableCreate).subscribe(() => {
        console.log('success');
        this.massage.emit('Tạo mới thành công!!!');
        this._router.navigateByUrl('/table/list');

      }, err => {
        console.log(err.error.message);
      });
    }
    if ((!this.check) || (!this.tableForm.valid)) {
      alert('Lỗi');
      if (!this.check) {
        this.messageErr = 'codeTable đã tồn tại!!!';
        this.check = true;
      }
    }
  }

  returnList() {
    this.massage.emit('Tạo mới thất bại!!!');
    this._router.navigateByUrl('/table/list');
  }
}
