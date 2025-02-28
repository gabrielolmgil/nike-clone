import { Component } from '@angular/core';
import { InicioLandingComponent } from './inicio-landing/inicio-landing.component';
import { CarruselLandingComponent } from './carrusel-landing/carrusel-landing.component';
import { FooterLandingComponent } from './footer-landing/footer-landing.component';

@Component({
  selector: 'app-landing-page',
  imports: [InicioLandingComponent, CarruselLandingComponent, FooterLandingComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

}
