import { TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';  // Importa tu componente
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Importa el módulo de testing
import { AuthService } from '../services/auth/auth.service';  // Si tu AuthService está en otro lugar, ajusta la ruta

describe('RegisterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule], // Importa el componente standalone y el módulo de HttpClient
      providers: [AuthService]  // Asegúrate de proporcionar el AuthService si no está en los providers de la app
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RegisterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
