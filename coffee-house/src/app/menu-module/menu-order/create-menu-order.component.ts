import {Component, OnDestroy, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {OderDetail} from '../../model/oderDetail';
import {Product} from '../../model/product';
import {MenuService} from '../service/menu.service';
// @ts-ignore
import {Router} from "@angular/router";
import {TypeProduct} from "../../model/typeProduct";
import {MenuOrderDTO} from "../../model/MenuOrderDTO";
import {FormBuilder} from "@angular/forms";
import {Observable, Subscription, timer} from "rxjs";
import {map, take} from "rxjs/operators";
import {TokenStorageService} from '../../login-module/service/token-storage.service';

@Component({
  selector: 'app-create-menu-oder',
  templateUrl: './create-menu-order.component.html',
  styleUrls: ['./create-menu-order.component.css']
})
export class MenuOrderComponent implements OnInit, OnDestroy {
  oderDetail: OderDetail;
  product: Product;
  id: number;
  sum = 0;
  quatity = 1;

  // tslint:disable-next-line:variable-name
  private currentTemp: number;

  constructor(private menuService: MenuService, private _formBuilder: FormBuilder, private router: Router) {
  }

  /* Count down time for food */
  countDown: Subscription;
  counter = 300;
  tick = 1000;
  activeTimeWait: boolean = true;

  /* Check time wait in order */
  timeWait: number = 0;

  /* Define variable */
  products: Product[] | undefined;
  typeProducts: TypeProduct[] | undefined;
  amountProducts: number;
  menuOrderDTOs: MenuOrderDTO[];

  /* Lấy table của a Bin */
  idTable: number = 1;
  idOrder: number = 22;

  /* Define size page and current page */
  sizePage: number = this.menuService.sizePage;
  totalPage: number = 0;
  totalPageSurplus: number = 0;
  totalPageArray: Array<any>;
  currentPage: number = 0;

  /* Define size page and current page for table DTO */
  sizePageTable: number = this.menuService.sizePageTable;
  totalPageTable: number = 0;
  totalPageSurplusTable: number = 0;
  totalPageTableArray: Array<any>;
  currentPageTable: number = 0;
  dataDTOExisting: boolean;

  /* Active button pagination */
  activedButton = 1;
  activedButtonTable = 1;

  /* Check active click */
  idTypeProduct = 0;
  checkGetAll = true;

  /* List to store id orderDetail to remove */
  listIdOrderDetails: any[] = [];

  /* Hide and show Menu */
  showMenuPhone = false;

 // origin/menu-management
  ngOnInit(): void {
    this.getAll();
    /* Set value type default is get all */
    this.getTypeOfGet(0);

    /* Show data DTO */
    this.getDataDTOForTable();
  }

  ngOnDestroy() {
    this.countDown = null;
  }

  /* Get products and pagination */
  getProducts() {
    this.menuService.getProducts().subscribe(data => {
      this.products = data;
    })

    /* Get amount of products */
    this.menuService.getAmountOfProducts().subscribe(data => {
      this.amountProducts = data;
      this.pagination(data, true);
    })
  }

  /* get products By Type Id and pagination */
  getProductByTypeId(idTypeProduct: number) {
    this.menuService.getProductByTypeId(idTypeProduct).subscribe(data => {
      this.products = data;
    });

    /* Get amount of products */
    this.menuService.getAmountOfProductsByIdType(idTypeProduct).subscribe(data => {
      this.amountProducts = data;
      this.pagination(data, true);
    })
  }

  /* Get list products */
  getAll() {
    this.menuService.getProducts().subscribe(data => {
      this.products = data;
    })

    this.menuService.getTypeProducts().subscribe(data => {
      this.typeProducts = data;
    })
  }

  /* Check which category has clicked  */
  getTypeOfGet(idTypeProduct: number) {
    if (idTypeProduct == 0) {
      /* Set and check current page */
      this.currentPage = 0;
      this.checkGetAll = true;
      this.checkActiveButton(this.currentPage, this.currentPage, true);
      this.menuService.getTypeOfGet();
      this.getProducts();
    } else {
      /* Set and check current page */
      this.currentPage = 0;
      this.checkActiveButton(this.currentPage, this.currentPage, true);
      this.checkGetAll = false;
      this.menuService.getTypeOfGet();
      /* Get id type product */
      this.idTypeProduct = idTypeProduct;
      this.getProductByTypeId(idTypeProduct);
    }
  }

  // Cộng số lượng sản phẩm
  addQuality() {
    if (this.quatity === this.product.quatityProduct) {
      alert('Vui lòng đặt tối thiểu 5 sản phẩm');
    } else {
      this.quatity = this.quatity + 1;
    }
  }

  // Trừ số lượng sản phẩm
  subQuatity() {
    if (this.quatity > 1) {
      this.quatity = this.quatity - 1;
    }
  }

  // Get product by ID
  getProductById(id: number) {
    this.menuService.findByIdProduct(id).subscribe(
      (data) => {
        if (data) {
          this.product = data;
        }
      }, (e) => {
        console.log(e);
      }
    );
  }

  editOrderDetail() {
    const orderDetail = {
      numberProduct: this.quatity,
      totalPrice: this.totalPrice(),
      order: {idOrder: 1},
      product: {idProduct: 1}
    };
    console.log(orderDetail);
    if (orderDetail) {
      this.menuService.editOrderDetail(orderDetail).subscribe(
        data => {
          alert('Lưu thay đổi món thành công');
        }, error => {
          console.log(error);
        }
      );
    }
  }

  addOrderDetail(idProduct) {
    const orderDetail = {
      numberProduct: this.quatity,
      totalProduct: this.totalPrice(),
      /* Dữ liệu cứng */
      order: {idOrder: this.idOrder},
      product: {idProduct: idProduct}
    };
    console.log(orderDetail);
    if (orderDetail) {
      this.menuService.saveOrderDetail(orderDetail).subscribe(
        data => {
          alert('Thêm món thành công');
          this.ngOnInit();
        }, error => {
          console.log(error);
        }
      );
    }
  }

  totalPrice() {
    return this.sum = this.quatity * this.product.priceProduct;
  }

  /* Pagination for home page
  * if pageCheck == true => pagination for products
  * if pageCheck == false => pagination for table dto*/
  pagination(amountProducts: number, pageCheck: boolean) {
    if (pageCheck) {
      this.totalPage = Math.floor(amountProducts / this.sizePage);
      this.totalPageSurplus = Math.floor(amountProducts % this.sizePage);
      if (this.totalPageSurplus != 0) {
        this.totalPageArray = Array(this.totalPage + 1).fill(1).map((x, i) => i);
      } else {
        this.totalPageArray = Array(this.totalPage).fill(1).map((x, i) => i);
      }
    } else {
      this.totalPageTable = Math.floor(amountProducts / this.sizePageTable);
      this.totalPageSurplusTable = Math.floor(amountProducts % this.sizePageTable);
      if (this.totalPageSurplusTable != 0) {
        this.totalPageTableArray = Array(this.totalPageTable + 1).fill(1).map((x, i) => i);
      } else {
        this.totalPageTableArray = Array(this.totalPageTable).fill(1).map((x, i) => i);
      }
    }
  }


  /* Check button next and prev
  * if pageCheck == true => pagination for products
  * if pageCheck == false => pagination for table dto */
  nextPage(pageCheck: boolean) {
    if (pageCheck) {
      this.currentPage += this.sizePage;
      this.menuService.nextPage(this.currentPage, true);
      if (this.checkGetAll) {
        this.getAll();
      } else {
        this.getProductByTypeId(this.idTypeProduct);
      }

      /* Check location current page */
      this.checkActiveButton(this.currentPage, 1, true);
    } else {
      this.currentPageTable += this.sizePageTable;
      this.menuService.nextPage(this.currentPageTable, false);
      this.getDataDTOForTable();

      /* Check location current page */
      this.checkActiveButton(this.currentPageTable, 1, false);
    }
  }

  prevPage(pageCheck: boolean) {
    if (pageCheck) {
      this.currentPage -= this.sizePage;
      this.menuService.prevPage(this.currentPage, true);
      if (this.checkGetAll) {
        this.getAll();
      } else {
        this.getProductByTypeId(this.idTypeProduct);
      }

      /* Check location current page */
      this.checkActiveButton(this.currentPage, 1, true);
    } else {
      this.currentPageTable -= this.sizePageTable;
      this.menuService.prevPage(this.currentPageTable, false);
      this.getDataDTOForTable();

      /* Check location current page */
      this.checkActiveButton(this.currentPageTable, 1, false);
    }
  }

  /* Redirect other page
  * if pageCheck == true => pagination for products
  * if pageCheck == false => pagination for table dto */
  redirectPagination(tg: any, pageCheck: boolean) {
    if (pageCheck) {
      this.menuService.getAmountOfProducts().subscribe(data => {
        /* Get amounts of all products */
        this.currentPage = 1;

        /* Handle redirect page */
        if (tg == 1) {
          this.currentPage = 0;
        } else {
          tg -= 1;
          this.currentPage = tg * this.sizePage;
        }
        this.menuService.redirectPagination(this.currentPage, true);

        /* Check location current page */
        this.checkActiveButton(this.currentPage, 1, true);

        /*Check between get All and GetById */
        if (this.checkGetAll) {
          this.getAll();
        } else {
          this.getProductByTypeId(this.idTypeProduct);
        }
      });
    } else {
      /* Code pagination for pagable */
      this.menuService.getDataDTOForTable(1).subscribe(data => {
        /* Get amounts of all products */
        tg -= 1;
        this.currentPageTable = tg;

        this.menuService.redirectPagination(this.currentPageTable, false);

        /* Check location current page */
        this.checkActiveButton(this.currentPageTable * this.sizePageTable, 1, false);

        /* Set default value for next and prev */
        this.currentPageTable = tg * this.sizePageTable;
        this.getDataDTOForTable();
      });
    }
  }

  /* Check active button and get location current of page and check last button
  * if pageCheck == true => pagination for products
  * if pageCheck == false => pagination for table dto */
  checkActiveButton(currentPage: number, defaultCurrentPage: number, pageCheck: boolean) {
    if (pageCheck) {
      /* Set default current page when redirect other get */
      if (defaultCurrentPage == 0) {
        currentPage = defaultCurrentPage;
      }
      this.activedButton = Math.round(currentPage / this.sizePage) + 1;
    } else {
      this.activedButtonTable = Math.round(currentPage / this.sizePageTable) + 1;
    }
  }

  /* Get data DTO for tab`le */
  getDataDTOForTable() {
    this.menuService.getDataDTOForTable(1).subscribe(data => {
      this.menuOrderDTOs = data;
      this.pagination(this.menuOrderDTOs[data.length - 1].totalPageDTO, false);
    })

    this.checkDataDTO();
  }

  /* Check data DTO existing */
  checkDataDTO() {
    this.menuService.getDataDTOForTable(this.idTable).subscribe(data => {
      if (data[0].quantity == 0) {
        this.dataDTOExisting = false;
      } else {
        this.dataDTOExisting = true;
      }
    })
  }

  /* Payment */
  handlePayment() {
    this.menuService.handlePaymentForOrder(this.idTable).subscribe(() => {
      this.router.navigateByUrl("");
    })
  }

  checkFoodChosen(idOrderDetail: number) {
    this.listIdOrderDetails.push(idOrderDetail);
  }

  handleDeleteFood() {
    if (this.activeTimeWait) {
      if (this.listIdOrderDetails.length > 0) {
        for (let i = 0; i < this.listIdOrderDetails.length; i++) {
          this.menuService.handleDeleteFood(this.listIdOrderDetails[i] , this.idOrder).subscribe(data=> {
            this.ngOnInit();
          });
        }
      } else {
        alert("Bạn phải chọn món trước khi xóa!");
      }
    } else {
      alert("Hết thời gian xóa món");
    }
  }

  /* Button gọi món */
  handleOrder() {
    /* Count down time */
    this.activatedCountDown();
  }

  /* Run count down
  * if true will run */
  activatedCountDown() {
    this.countDown = timer(0, this.tick).subscribe(time => {
      time = --this.counter;
      this.timeWait = time;
      if (time == 0) {
        this.countDown.unsubscribe();
        this.timeWait = 0;
        this.activeTimeWait = false;
      }
    });
  }

  showMenuOnPhone() {
    this.showMenuPhone = !this.showMenuPhone;
  }
}

/* Format for time */
@Pipe({
  name: "formatTime"
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return (
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}

