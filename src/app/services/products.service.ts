import { Injectable, signal } from '@angular/core';
import { Products } from '../interfaces/products';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products = signal<Products[]>([]);
  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = 'http://localhost:3000';
  datosProducts = signal<Products[]>([]);



  setProducts(producto: Products): void {
    this.datosProducts.set([...this.datosProducts(), producto]);
  }
  createProduct(producto: Products): void {
    console.log(producto);
    this.http.post(`${this.apiUrl}/api/setProduct`, {reference: producto.reference, name: producto.name, price: producto.price, description: producto.description, check: producto.check, type: producto.type, img: producto.img }).subscribe({
      next: (response) => {
      },
      error: (err) => {
      }
    });
  }

  
  getProducts(): void {
    this.http.get<Products[]>(`${this.apiUrl}/api/getProduct`).subscribe({
          next: (response) => {
            console.log(response);
            this.products.set(response);
          },
          error: (err) => {
            console.error(err);
          }
        });
  }
}
