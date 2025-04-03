import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  constructor(public productService:ProductsService){};

  ngOnInit(): void {
    this.productService.getProducts();
  }
  deleteProduct(reference: number): void {
    this.productService.deleteProduct(reference);
    this.productService.getProducts();
  }

}
