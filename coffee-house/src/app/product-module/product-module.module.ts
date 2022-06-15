import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductModuleRoutingModule } from './product-module-routing.module';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    CreateProductComponent,
    ListProductComponent,
    EditProductComponent
  ],
    imports: [
        CommonModule,
        ProductModuleRoutingModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ProductModuleModule { }
