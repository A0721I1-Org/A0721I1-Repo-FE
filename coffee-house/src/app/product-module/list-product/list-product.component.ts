import { Component, OnInit } from '@angular/core';
import {ProductService} from '../service/product.service';
import {Product} from '../../model/product';


@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {
codeName = '';
nameProduct = '';
trangChu: boolean;
message: string;
  constructor(private service: ProductService) { }
  productList: Product[];

  ngOnInit(): void {
    this.findByAll();
  }
  findByAll(){
    this.service.findByAll().subscribe(
      data => this.productList = data,
    () => {},
      () => {},
    );
  }

  delete(idProduct: any) {
    console.log(idProduct);
    this.service.deleteById(idProduct).subscribe(()  => {
      this.ngOnInit();
      alert(`delete thành công :${idProduct}`);
    }
    );
  }

  search() {
    this.service.search(this.codeName, this.nameProduct).subscribe(
      (data: Product[]) => {
        if (data != null){
          this.productList = data ;
          this.trangChu = false;
          this.message = ''; }
        else {
          this.ngOnInit();
          this.message = 'Không Tồn Tại Xin Vui Lòng Nhập Lại';
        }
        },
      () => {},
      () => {},
    );
  }

  trangchu() {
    this.ngOnInit();
    this.trangChu = true;
  }
}
