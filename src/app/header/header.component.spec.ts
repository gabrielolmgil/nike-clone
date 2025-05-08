import { TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';  // Asegúrate de usar la ruta correcta
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';  // Para crear un Observable mockeado

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule], // Importa el componente standalone y RouterTestingModule
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {  // Mock de ActivatedRoute
            params: of({}),  // Mock de los parámetros de la ruta
            queryParams: of({}),  // Mock de los queryParams
            snapshot: {}  // Mock de la instantánea de la ruta
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
