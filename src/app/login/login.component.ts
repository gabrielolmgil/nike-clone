import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { UserLogin } from '../interfaces/user-login';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService:AuthService){}
    loginForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ])
    });
    handleSubmit(){
        const user:UserLogin = {
          name:this.loginForm.controls.name.value ||'',
          password:this.loginForm.controls.password.value ||'',
        };
        this.authService.postUser(user)
      }

}
