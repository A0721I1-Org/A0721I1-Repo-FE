import {Component, OnInit, ViewChild} from '@angular/core';
import {OderDetail} from '../../model/oderDetail';
import {Product} from '../../model/product';
import {MenuService} from '../service/menu.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

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
  ngOnInit(): void {
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


}
