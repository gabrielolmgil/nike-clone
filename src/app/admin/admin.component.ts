import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Products } from '../interfaces/products';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './admin.component.html',
})
export class AdminComponent {
  constructor(private productService: ProductsService) {}

  productForm = new FormGroup({
    reference: new FormControl<string | null>('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    name: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    price: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl<string | null>('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
    ]),
    check: new FormControl<boolean | null>(false), // ✅ tipo correcto
    type: new FormControl<string | null>('', [
      Validators.required,
    ]),
    img: new FormControl<string | null>('', [
      Validators.required,
    ]),
  });

  handleSubmit() {
    const producto: Products = {
      reference: Number(this.productForm.controls.reference.value) || 0,
      name: this.productForm.controls.name.value || '',
      price: Number(this.productForm.controls.price.value) || 0,
      description: this.productForm.controls.description.value || '',
      check: this.productForm.controls.check.value ?? false,
      type: this.productForm.controls.type.value || '',
      img: this.productForm.controls.img.value || '',
    };

    this.productService.createProduct(producto);
  }
}
