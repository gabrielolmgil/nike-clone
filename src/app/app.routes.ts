import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponent } from './admin/admin.component';
import { ProductosComponent } from './productos/productos.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];