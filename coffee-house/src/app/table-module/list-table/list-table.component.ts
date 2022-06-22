import {Component, OnInit} from '@angular/core';
import {TableService} from '../service/table.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {
  tables: any;
  table: any;
  p = 0;
  formSearch: FormGroup;
  message: String = null;


  constructor(private tableService: TableService, private router: Router) { }

  ngOnInit(): void {
    this.findAllTable();
    this.formSearch = new FormGroup({
      tableNumber: new FormControl(),
      status: new FormControl(),
      emptyTable: new FormControl()
    });
    this.message = this.tableService.message;
    if (this.message != null) {
      document.getElementById('noti').hidden = false;
    }
  }

  findAllTable() {
    this.tableService.findAllTable().subscribe((tables: any) => {
      this.tables = tables;
    });
  }

  deleteTable(id: number) {
    this.table = this.findTableById(id);
    if (this.formSearch.value.tableNumber != '' && this.formSearch.value.tableNumber != null) {
      this.formSearch.controls.status.enable();
      this.formSearch.controls.emptyTable.enable();
    }
    this.tableService.deleteTable(id).subscribe(() => {}, () => {}, () => {
      this.tableService.message = 'Xoá bàn thành công!';
      this.ngOnInit();
    });
  }

  findTableById(id: number) {
    this.tableService.findTableById(id).subscribe((table: any) => {
      return table;
    });
  }

  changeTableNumber(value) {
    if (value != '') {
      this.formSearch.controls.status.disable();
      this.formSearch.controls.emptyTable.disable();
    } else {
      this.formSearch.controls.status.enable();
      this.formSearch.controls.emptyTable.enable();
    }
  }

  submitFormSearch() {
    const codeTable = this.formSearch.value.tableNumber;
    const idStatus = this.formSearch.value.status;
    const emptyTable = this.formSearch.value.emptyTable;
    console.log(codeTable);
    if (codeTable != '' && codeTable !== null) {
      this.tableService.findAllTableByCodeTable(codeTable).subscribe((tables: any) => {
        this.tables = tables;
      });
    } else if (idStatus !== null && idStatus !== 'null' && emptyTable !== null && emptyTable !== 'null') {
      this.tables = this.tableService.findAllTableByIdStatusAndEmptyTable(idStatus, emptyTable).subscribe((tables: any) => {
        this.tables = tables;
      });
    } else if (idStatus !== null && idStatus !== 'null') {
      this.tables = this.tableService.findAllTableByIdStatus(idStatus).subscribe((tables: any) => {
        this.tables = tables;
      });
    } else if (emptyTable !== null && emptyTable !== 'null'){
      this.tables = this.tableService.findAllTableByEmptyTable(emptyTable).subscribe((tables: any) => {
        this.tables = tables;
      });
    } else {
      this.ngOnInit();
    }
  }

  hide() {
    document.getElementById('noti').hidden = true;
  }
}
