import {TypeProduct} from './typeProduct';

export interface Product {
  idProduct: number;
  codeProduct: string;
  nameProduct: string;
  priceProduct: number;
  imageProduct: string;
  descriptionProduct: string;
  typeProduct: TypeProduct;
}
