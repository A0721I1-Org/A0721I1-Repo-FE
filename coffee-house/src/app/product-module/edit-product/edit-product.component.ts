import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Product} from '../../model/product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TypeProduct} from '../../model/typeProduct';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  typeProduct: TypeProduct[];
  next: any;
  selectedImage: any;
  errorImage: string;
  imgVip = 'https://accounts.viblo.asia/assets/webpack/profile_default.0bca52a.png';
  editForm = this.fb.group({
    idProduct: ['', Validators.required],
    codeProduct: ['', Validators.required],
    nameProduct: ['', Validators.required],
    priceProduct: ['', Validators.required],
    imageProduct: ['', Validators.required],
    descriptionProduct: ['', Validators.required],
    typeProduct: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private service: ProductService,
              private router: Router, private activatedRoute: ActivatedRoute,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }
  ngOnInit(): void {
    this.service.findType().subscribe((data => {
      this.typeProduct = data;
      console.log(this.typeProduct);
      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        const id = Number(paramMap.get('id'));
        this.service.findById(id).subscribe(next => {
          console.log(next);
          this.imgVip = next.imageProduct;
          this.editForm.setValue(next);
          console.log(this.editForm);

        });
      });
    }));

  }

  onSubmit(): void {
    if (this.selectedImage != null) {
      const nameImg = '/A0721I1-' + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.editForm.patchValue({imageProduct: url});
            this.service.updateProduct(this.editForm.value).subscribe(() => {
              console.log(this.editForm.value);
              this.product = this.editForm.value;
              alert('Sua thanh cong');
              this.service.updateProduct(this.product).subscribe(next => this.router.navigateByUrl('/product/list'));
            }, error => {
            });
          });
        })
      ).subscribe();
    } else {
      const product = this.editForm.value;
      this.service.updateProduct(this.editForm.value).subscribe(() => {
        console.log(this.editForm.value);
        this.product = this.editForm.value;
        alert('Sua thanh cong');
        this.service.updateProduct(this.product).subscribe(next => this.router.navigateByUrl('/product/list'));
      });
    }
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = e => {
      console.log(e);
      this.imgVip = reader.result as string;
    };
  }

}
