import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../service/product.service';
import {Router} from '@angular/router';
import {TypeProduct} from '../../model/typeProduct';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  typeProduct: TypeProduct[];
  createForm: FormGroup = new FormGroup({
      idProduct: new FormControl(['', Validators.required]),
      codeProduct: new FormControl(['', Validators.required]),
      nameProduct: new FormControl(['', Validators.required]),
      priceProduct: new FormControl(['', Validators.required]),
      imageProduct: new FormControl(['', Validators.required]),
      descriptionProduct: new FormControl(['', Validators.required]),
      typeProduct: new FormControl(['', Validators.required]),
    });


  constructor(private fb: FormBuilder, private service: ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.service.findType().subscribe((data => this.typeProduct = data));
  }

  onSubmit(): void {
    this.service.createProduct(this.createForm.value).subscribe(
      () => {},
      (e) => {console.log(e); },
      () => {
        alert('Them thanh cong');
        this.router.navigateByUrl('/product/list');
      });
    console.log(this.createForm);
  }
}
