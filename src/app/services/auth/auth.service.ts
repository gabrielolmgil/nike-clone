import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { User } from '../../interfaces/user';
import { UserLogin } from '../../interfaces/user-login';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  apiUrl = 'http://localhost:3000'; // URL de la API
  datosUser = signal<User[]>([]);

  getAuth(): User[] {
    return this.datosUser();
  }

  setAuth(user: User): void {
    this.datosUser.set([...this.datosUser(), user]);
  }

  createUser(user: User): void {
    this.http.post(`${this.apiUrl}/api/register`, { name: user.name, password: user.password, role: user.role }).subscribe({
      next: (response) => {
      },
      error: (err) => {
      }
    });
  }
  postUser(user: UserLogin): void {
    console.log(user);
    this.http.post<LoginResponse>(`${this.apiUrl}/api/login`, { name: user.name, password: user.password }).subscribe({
      next: (response) => {
        console.log(response.role);
        if(response.role == 'Admin'){
          this.router.navigate(['/admin']); 
        }else if (response.role == 'Guest'){
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
}
}
