import {Component, OnInit} from '@angular/core';
import {Table} from '../../model/table';
import {TableService} from '../service/table.service';
import {Oder} from '../../model/oder';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-table-active',
  templateUrl: './list-table-active.component.html',
  styleUrls: ['./list-table-active.component.css']
})
export class ListTableActiveComponent implements OnInit {
  tables: Table[];
  idEmployee = 1;

  constructor(private tableService: TableService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.tableService.getAllStatusTable().subscribe((value) => {
      this.tables = value;
    });
  }

  addOrderBeNull(idEmployee: number, idTable: number) {
    this.tableService.addNewOrder(this.idEmployee, idTable).subscribe(() => {
    }, () => {
    }, () => {
      this.router.navigateByUrl('/menu/menu-order-child');
    });
  }

}
