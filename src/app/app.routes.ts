import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponent } from './admin/admin.component';
import { ProductosComponent } from './productos/productos.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'admin', component: AdminComponent },
];