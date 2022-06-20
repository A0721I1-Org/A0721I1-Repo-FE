import {Component, OnInit} from '@angular/core';
import {Table} from '../../model/table';
import {TableService} from '../service/table.service';
import {Oder} from '../../model/oder';
import {Router} from '@angular/router';
import {Employee} from '../../model/employee';
import {TokenStorageService} from '../../login-module/service/token-storage.service';

@Component({
  selector: 'app-list-table-active',
  templateUrl: './list-table-active.component.html',
  styleUrls: ['./list-table-active.component.css']
})
export class ListTableActiveComponent implements OnInit {
  tables: Table[];
  employee: Employee; // dữ liệu cứng  . chờ a hoàng code để lấy idEmployee
  dateOrder: string;

  constructor(private tableService: TableService,
              private router: Router,
              private  tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.tableService.getAllStatusTable().subscribe((value) => {
      this.tables = value;
    });
  }

  addOrderBeNull(idTable: number) {
    this.tableService.addNewOrder(this.tokenStorageService.getUser().id, idTable, this.dateOrder).subscribe(() => {

      },
      () => {
      }, () => {
        this.router.navigateByUrl('/menu/menu-order-child');
      }
    )
    ;
  }

}
