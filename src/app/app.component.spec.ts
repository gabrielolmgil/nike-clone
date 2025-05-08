import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';  // Asegúrate de que la ruta es correcta
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // Mock para ActivatedRoute
  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '123', // valor ficticio para evitar errores
      },
    },
    queryParams: of({}),  // Simula los query parameters
    params: of({ id: '123' })  // Simula los params
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,  // Componente standalone
        HttpClientTestingModule,  // Si necesitas hacer pruebas HTTP
        ReactiveFormsModule  // Si el componente usa formularios reactivos
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }  // Proveer el mock de ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
