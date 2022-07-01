import {Component, OnInit} from '@angular/core';

import {OderService} from '../service/oder.service';
import {Oder} from '../../model/oder';
import {HttpClient} from '@angular/common/http';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {OderDetail} from '../../model/oderDetail';

declare function numPage(n): any;

@Component({
  selector: 'app-oder',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Oder[];
  order: Oder;
  public searchOrder: FormGroup;
  totalPage: number;
  page = 0;
  pageQuantity: number[];
  message: string;
  idOrder: number;
  detailOrder: OderDetail[] = [];
  numberPage: boolean;

  constructor(private oderService: OderService, private http: HttpClient, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.searchOrder = new FormGroup({
      idOrder: new FormControl('', Validators.pattern('[1-9]+')),
      dateOrder: new FormControl('')
    });
    this.findAll();
  }

  findAll() {
    this.oderService.getList().subscribe(data => {
        this.totalPage = Math.ceil(data.length / 5);
        console.log('day la tong so trang truoc khi search' + this.totalPage);
        this.pageQuantity = new Array(this.totalPage);
      },
      () => {
      },
      () => {
      });
    this.oderService.getPage(0).subscribe((data: Oder[]) => this.orders = data['content']);
    this.numberPage = true;
    console.log(this.orders);
  }

  search() {
    const idSearch = this.searchOrder.value.idOrder;
    const dateSearch = this.searchOrder.value.dateOrder;
    console.log('day la id:' + idSearch);
    console.log('day la date:' + dateSearch);
    this.oderService.searchPage(idSearch, dateSearch, 0).subscribe(
      data => {
        if (data == null) {
          this.orders = null;
          this.totalPage = 0;
          this.page = 0;
          this.pageQuantity = new Array(this.totalPage);
          console.log('day la tong so trang sau khi search' + this.totalPage);
          this.message = 'Không Tìm Thấy Hoá Đơn, Xin Vui Lòng Nhập Lại';
        } else {
          this.numberPage = true;
          this.page = 0;
          this.oderService.searchList(idSearch, dateSearch).subscribe(next => {
              this.totalPage = Math.ceil(next.length / 5);
              console.log('day la tong so trang sau khi search' + this.totalPage);
              this.pageQuantity = new Array(this.totalPage);
            }
            ,
            () => {
            },
            () => {
            });
          this.orders = data['content'];
        }
      }
    );
  }

  changePage(numPage: number) {
    // this.page = this.page + 1;
    if (this.searchOrder.value.idOrder === '' && this.searchOrder.value.dateOrder === '') {
      this.oderService.getPage(numPage).subscribe(
        (data) => {
          this.orders = data['content'];
          this.page = numPage;
          console.log('day la tong so trang' + this.totalPage);
        },
        () => {
        },
        () => {
        });
    } else {
      this.oderService.searchPage(this.searchOrder.value.idOrder, this.searchOrder.value.dateOrder, numPage).subscribe(
        (data) => {
          this.orders = data['content'];
          this.page = numPage;
          console.log('day la tong so trang' + this.totalPage);
        },
        () => {
        },
        () => {
        },
      );
    }
  }

  nextPage() {
    this.page = this.page + 1;
    if (this.searchOrder.value.idOrder === '' && this.searchOrder.value.dateOrder === '') {
      this.oderService.getPage(this.page).subscribe(
        (data) => {
          this.orders = data['content'];
          console.log('day la tong so trang' + this.totalPage);
        },
        () => {
        },
        () => {
        });
    } else {
      this.oderService.searchPage(this.searchOrder.value.idOrder, this.searchOrder.value.dateOrder, this.page).subscribe(
        (data) => {
          this.orders = data['content'];
          console.log('day la tong so trang' + this.totalPage);
        },
        () => {
        },
        () => {
        },
      );
    }
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.page >= 0) {
      if (this.searchOrder.value.idOrder === '' && this.searchOrder.value.dateOrder === '') {
        this.oderService.getPage(this.page).subscribe(
          (data) => {
            this.orders = data['content'];
            console.log('day la tong so trang' + this.totalPage);
          },
          () => {
          },
        );
      } else {
        this.oderService.searchPage(this.searchOrder.value.idOrder, this.searchOrder.value.dateOrder, this.page).subscribe(
          (data) => {
            this.orders = data['content'];
            console.log('day la tong so trang' + this.totalPage);
          },
          () => {
          },
        );
      }
    }
  }

  hide() {
    document.getElementById('noti').hidden = true;
  }

  getDetailOrder(id: number) {

    this.oderService.getOrderDetailById(id).subscribe(data => {
      this.detailOrder = data;
      console.log(this.detailOrder);
      console.log(id);
    });

  }
}

