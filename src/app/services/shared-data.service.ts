import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  selectedProduct: Product | null = null;

  constructor() {}

  setSelectedProduct(product: Product) {
    this.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }
}