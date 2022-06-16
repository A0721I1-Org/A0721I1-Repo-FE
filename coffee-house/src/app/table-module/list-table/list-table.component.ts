import {Component, OnInit} from '@angular/core';
import {TableService} from '../service/table.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list-table',
  templateUrl: './list-table.component.html',
  styleUrls: ['./list-table.component.css']
})
export class ListTableComponent implements OnInit {
  tables: any;
  table: any;
  p: number = 0;
  formSearch: FormGroup;
  // message:String;


  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.findAllTable();
    // this.message = this.tableService.message;
    this.formSearch = new FormGroup({
      tableNumber: new FormControl(),
      status: new FormControl(),
      emptyTable: new FormControl()
    })
  }

  findAllTable() {
    this.tableService.findAllTable().subscribe((tables: any) => {
      this.tables = tables;
    })
  }

  deleteTable(id: number) {
    this.tableService.deleteTable(id).subscribe(() => {}, () => {}, () => {
      this.ngOnInit();
    });
  }

  findTableById(id: number) {
    this.tableService.findTableById(id).subscribe((table: any) => {
      return table;
    });
  }

  changeEmptyTable(id: number) {
    this.table = this.findTableById(id);
    this.tableService.updateEmptyTable(id, this.table).subscribe(() => {}, () => {}, () => {
    })
  }

  changeTableNumber(value) {
    if (value != '') {
      this.formSearch.controls['status'].disable();
      this.formSearch.controls['emptyTable'].disable();
    } else {
      this.formSearch.controls['status'].enable();
      this.formSearch.controls['emptyTable'].enable();
    }
  }

  submitFormSearch() {
    let codeTable = this.formSearch.value.tableNumber;
    let idStatus = this.formSearch.value.status;
    let emptyTable = this.formSearch.value.emptyTable;
    if (codeTable != '' && codeTable !== null) {
      this.tableService.findAllTableByCodeTable(codeTable).subscribe((tables: any) => {
        this.tables = tables;
      });

    } else if (idStatus !== null && idStatus !== "null" && emptyTable !== null && emptyTable !== "null") {
      this.tables = this.tableService.findAllTableByIdStatusAndEmptyTable(idStatus, emptyTable).subscribe((tables: any) => {
        this.tables = tables;
      })
    } else if (idStatus !== null && idStatus !== "null") {
      this.tables = this.tableService.findAllTableByIdStatus(idStatus).subscribe((tables: any) => {
        this.tables = tables;
      })
    } else if (emptyTable !== null && emptyTable !== "null"){
      this.tables = this.tableService.findAllTableByEmptyTable(emptyTable).subscribe((tables: any) => {
        this.tables = tables;
      })
    } else {
      this.ngOnInit();
    }
  }
}
