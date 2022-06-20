import {Component, OnInit} from '@angular/core';
import {Table} from '../../model/table';
import {TableService} from '../service/table.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDetailMenuDTO} from '../../model/OrderDetailMenuDTO';
import {Oder} from '../../model/oder';

@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrls: ['./detail-table.component.css']
})
export class DetailTableComponent implements OnInit {
  idTable: number;
  order: Oder;
  codeTable: string;
  totalOrder: number;
  table: Table;

  orderDTO: OrderDetailMenuDTO[];

  constructor(private tableService: TableService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.idTable = this.activatedRouter.snapshot.params.id;
    this.getValue();
  }

  getValue() {
    /* Get DTO */
    this.tableService.getOrderDetailMenuDTO(this.idTable).subscribe(data => {
      this.codeTable = data[0].codeTable;
      if (data[0].totalOrder != null) {
        this.totalOrder = data[0].totalOrder;
      } else {
        this.totalOrder = 0;
      }
      this.orderDTO = data;
    });
  }


  cancelTable(idTable: number) {
    this.tableService.cancelTable(idTable).subscribe(() => {
    }, () => {
    }, () => {
      this.router.navigateByUrl('table/active');
    });
  }

  handlePayment(idTable: number) {
    this.tableService.payment(idTable).subscribe(() => {
      this.router.navigateByUrl('table/active');
    });
  }
}
