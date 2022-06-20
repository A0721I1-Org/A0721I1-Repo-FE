import {Component, OnInit} from '@angular/core';
import {Table} from '../../model/table';
import {TableService} from '../service/table.service';
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
  /* Lưu giá trị idOrder */
  idOrder: number;

  constructor(private tableService: TableService,
              private router: Router,
              private  tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.tableService.getAllStatusTable().subscribe((value) => {
      this.tables = value;
    });
  }

  // addOrderBeNull(idEmployee: number, idTable: number, dateOrder: string) {
  //   this.tableService.addNewOrder(this.idEmployee, idTable, dateOrder).subscribe(data => {
  //     this.router.navigate(['/menu/menu-order-child', idTable, this.idOrder]);
  //   }, () => {
  //   }, () => {
  //   });
  // }

  addOrderBeNull(idTable: number) {
    console.log(this.tokenStorageService.getUser().id);
    this.tableService.addNewOrder(this.tokenStorageService.getUser().id, idTable).subscribe(data => {
        this.idOrder = data.idOrder;
        this.router.navigate(['/menu/menu-order-child', idTable, this.idOrder , {mode: 'test'}]);
      }
    );
  }

}
