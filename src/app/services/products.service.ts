import { Injectable, signal } from '@angular/core';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  datosProducts = signal<Products[]>([]);
  
  getProducts(): Products[] {
    return this.datosProducts();
  }

  setProducts(producto: Products): void {
    this.datosProducts.set([...this.datosProducts(), producto]);
  }
}