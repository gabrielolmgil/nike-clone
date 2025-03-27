import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  constructor(private productService:ProductsService){}
  productForm = new FormGroup({
    reference: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    price: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(50),
    ]),
    check: new FormControl(''),
    type: new FormControl('',[
      Validators.required,
    ]),
    img: new FormControl(''),
  });
  handleSubmit(){

    console.log(this.productService.getProducts());
}

}

