import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {TypeProduct} from '../../model/typeProduct';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  editForm: FormGroup;
  product: Product;
  typeProduct: TypeProduct[];
  constructor(private fb: FormBuilder, private service: ProductService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
   this.service.findType().subscribe((data => this.typeProduct = data));
   this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.service.findById(id).subscribe(next => {
        console.log(next);
        this.editForm.patchValue(next);
      });
    });
   this.editForm = this.fb.group({
      idProduct: ['', Validators.required],
      codeProduct: ['', Validators.required],
      nameProduct: ['', Validators.required],
      priceProduct: ['', Validators.required],
      imageProduct: ['', Validators.required],
      descriptionProduct: ['', Validators.required],
      typeProduct: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log(this.editForm.value);
    this.product = this.editForm.value;
    this.service.updateProduct(this.product).subscribe(next => this.router.navigateByUrl('/product/list'));
  }

}
