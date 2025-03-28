import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  datosUser = signal<User[]>([]);

  getAuth(): User[] {
    return this.datosUser();
  }

  setAuth(user: User): void {
    this.datosUser.set([...this.datosUser(), user]);
  }

  // Método para actualizar un usuario
  updateUser(id: number, user: User): Observable<User> {
    const url = `http://localhost:3000/api/user/${id}`; 
    return this.http.put<User>(url, user); 
  }

  getUserById(id: number): Observable<User> {
    const url = `http://localhost:3000/api/user/${id}`;
    return this.http.get<User>(url);
  }
  createUser(user: User): Observable<User> {
    const url = `http://localhost:3000/api/user`; // URL de la API
    return this.http.post<User>(url, user); // Realiza la solicitud POST para crear un nuevo usuario
  }
}
