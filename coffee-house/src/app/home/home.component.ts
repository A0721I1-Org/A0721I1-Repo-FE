import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Product} from "../model/product";
import { ProductService } from '../product-module/service/product.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private subscription: Subscription | undefined;
  products: Product[];
  productsCart: Product[];

  constructor(
    private service: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.findAllNew();
    this.findAllCart();
  }

  findAllNew() {
    this.service.findAllNew().subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      () => {
      },
      () => {
      },
    );
  }

  findAllCart() {
    this.service.findAllCart().subscribe(
      (data) => {
        this.productsCart = data;
        console.log(this.productsCart);
      },
      () => {
      },
      () => {
      },
    );
  }

}
