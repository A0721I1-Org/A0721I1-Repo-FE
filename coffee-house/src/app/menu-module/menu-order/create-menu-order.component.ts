import {Component, OnInit, ViewChild} from '@angular/core';
import {OderDetail} from '../../model/oderDetail';
import {Product} from '../../model/product';
import {MenuService} from '../service/menu.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {Component, OnInit} from '@angular/core';
import {MenuService} from "../service/menu.service";
import {Product} from "../../model/product";
import {TypeProduct} from "../../model/typeProduct";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-create-menu-oder',
  templateUrl: './create-menu-order.component.html',
  styleUrls: ['./create-menu-order.component.css']
})
export class MenuOrderComponent implements OnInit {
  oderDetail: OderDetail;
  product: Product;
  id: number;
  sum = 0;
  quatity = 1;
  // tslint:disable-next-line:variable-name
   constructor(private menuService: MenuService, private _formBuilder: FormBuilder, private router: Router) { }
  /* Define variable */
  products: Product[] | undefined;
  typeProducts: TypeProduct[] | undefined;
  amountProducts: number;

  /* Define size page and current page */
  sizePage: number = this.menuService.sizePage;
  totalPage: number = 0;
  totalPageSurplus: number = 0;
  totalPageArray: Array<any>;
  currentPage: number = 0;

  /* Active button pagination */
  activedButton = 1;

  /* Check active click */
  idTypeProduct = 0;
  checkGetAll = true;

  constructor(private menuService: MenuService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAll();
    /* Set value type default is get all */
    this.getTypeOfGet(0);
  }

  /* Get products and pagination */
  getProducts() {
    this.menuService.getProducts().subscribe(data => {
      this.products = data;
    })

    /* Get amount of products */
    this.menuService.getAmountOfProducts().subscribe(data => {
      this.amountProducts = data;
      this.pagination(data);
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
      this.pagination(data);
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

  /* Check which category has clicked */
  getTypeOfGet(idTypeProduct: number) {
    if (idTypeProduct == 0) {
      /* Set and check current page */
      this.currentPage = 0;
      this.checkGetAll = true;
      this.checkActiveButton(this.currentPage , this.currentPage);
      this.menuService.getTypeOfGet();
      this.getProducts();
    } else {
      /* Set and check current page */
      this.currentPage = 0;
      this.checkActiveButton(this.currentPage , this.currentPage);
      this.checkGetAll = false;
      this.menuService.getTypeOfGet();
      /* Get id type product */
      this.idTypeProduct = idTypeProduct;
      this.getProductByTypeId(idTypeProduct);
    }
  }
  // Cộng số lượng sản phẩm
  addQuality(){
       if (this.quatity === this.product.quatityProduct){
         alert('Vui lòng đặt tối thiểu 10 sản phẩm');
       }else {
         this.quatity = this.quatity + 1;
       }
  }
  // Trừ số lượng sản phẩm
  subQuatity(){
       if (this.quatity > 1){
         this.quatity = this.quatity - 1;
       }
  }
  // Get product by ID
  getProductById(id: number){
     this.menuService.findByIdProduct(id).subscribe(
      (data) => {
        if (data){
          this.product = data;
        }
      }, (e) => {
        console.log(e);
      }
    );
  }
  editOrderDetail(){
    const orderDetail = {
      numberProduct: this.quatity,
      totalPrice: this.totalPrice(),
      order: {idOrder: 1},
      product: {idProduct: 1}
    };
    console.log(orderDetail);
    if (orderDetail){
      this.menuService.editOrderDetail(orderDetail).subscribe(
        data => {
          alert('Lưu thay đổi món thành công');
        }, error => {
          console.log(error);
        }
      );
    }
  }
  addOrderDetail(){
     const orderDetail = {
       numberProduct: this.quatity,
       totalPrice: this.totalPrice(),
       order: {idOrder: 1},
       product: {idProduct: 1}
     };
     console.log(orderDetail);
     if (orderDetail){
      this.menuService.saveOrderDetail(orderDetail).subscribe(
        data => {
          alert('Thêm món thành công');
        }, error => {
          console.log(error);
        }
      );
    }
  }
  totalPrice() {
    return this.sum = this.quatity * this.product.priceProduct;
  }
  // // lay id khi click vao san pham
/*  setId(id: number) {
    this.id = id;
  }*/


  /* Pagination for home page */
  pagination(amountProducts: number) {
    this.totalPage = Math.floor(amountProducts / this.sizePage);
    this.totalPageSurplus = Math.floor(amountProducts % this.sizePage);

    /* Set numbers of page */
    if (this.totalPageSurplus != 0) {
      this.totalPageArray = Array(this.totalPage + 1).fill(1).map((x, i) => i);
    } else {
      this.totalPageArray = Array(this.totalPage).fill(1).map((x, i) => i);
    }
  }

  /* Check button next and prev */
  nextPage() {
    this.currentPage += this.sizePage;
    this.menuService.nextPage(this.currentPage);
    if(this.checkGetAll) {
      this.getAll();
    } else {
      this.getProductByTypeId(this.idTypeProduct);
    }

    /* Check location current page */
    this.checkActiveButton(this.currentPage , 1);
  }

  prevPage() {
    this.currentPage -= this.sizePage;
    this.menuService.prevPage(this.currentPage);
    if(this.checkGetAll) {
      this.getAll();
    } else {
      this.getProductByTypeId(this.idTypeProduct);
    }

    /* Check location current page */
    this.checkActiveButton(this.currentPage , 1);
  }

  /* Redirect other page */
  redirectPagination(tg: any) {
    /* Check active button */
    this.menuService.getAmountOfProducts().subscribe(data => {
      /* Get amounts of all products */
      this.currentPage = 1;
      this.amountProducts = data;

      /* Handle first page */
      if (tg == 1) {
        this.currentPage = 0;
      }

      if (this.amountProducts % tg != 0) {
        tg -= 1;
        this.currentPage = tg * this.sizePage;
      }

      if (tg != 1 && this.amountProducts % tg == 0) {
        this.currentPage = tg * this.sizePage;
      }
      this.menuService.redirectPagination(this.currentPage);

      /* Check location current page */
      this.checkActiveButton(this.currentPage ,1);

      /*Check between get All and GetById */
      if(this.checkGetAll) {
        this.getAll();
      } else {
        this.getProductByTypeId(this.idTypeProduct);
      }
    });
  }

  /* Check active button and get location current of page and check last button */
  checkActiveButton(currentPage: number, defaultCurrentPage: number) {
    /* Set default current page when redirect other get */
    if (defaultCurrentPage == 0) {
      currentPage = defaultCurrentPage;
    }
    this.activedButton = Math.round(currentPage / this.sizePage) + 1;
  }
}
