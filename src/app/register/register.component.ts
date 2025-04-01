import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private authService:AuthService){}
    registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      role: new FormControl('', [
        Validators.required,
      ]),
    });
    handleSubmit(){
        const user:User = {
          name:this.registerForm.controls.name.value ||'',
          password:this.registerForm.controls.password.value ||'',
          role:this.registerForm.controls.role.value ||'',
        };
        this.authService.createUser(user)
        console.log(this.authService.getAuth());
      }

}
