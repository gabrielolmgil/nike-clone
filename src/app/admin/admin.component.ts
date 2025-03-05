import { Component } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
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
    price: new FormControl(''),
    description: new FormControl(''),
    check: new FormControl(''),
    type: new FormControl(''),
    img: new FormControl(''),
  });
  handleSubmit(){
    console.log(this.productForm.value);
}

}

