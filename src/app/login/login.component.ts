import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../interfaces/user';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
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
      ]),
    });
    handleSubmit(){
        const user:User = {
          name:this.loginForm.controls.name.value ||'',
          password:this.loginForm.controls.password.value ||'',
        };
        this.authService.setAuth(user)
        console.log(this.authService.getAuth());
      }

}
