import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ProductsService } from '../services/products.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Asegúrate de importar este módulo
import { ActivatedRoute } from '@angular/router';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let mockProductService: any;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '123', // Valor ficticio para evitar errores
      },
    },
  };

  beforeEach(async () => {
    mockProductService = {
      createProduct: jasmine.createSpy('createProduct').and.returnValue(of({}))
    };

    // Configura el TestBed con HttpClientTestingModule
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,      // Módulo necesario para formularios reactivos
        HttpClientTestingModule,  // Asegúrate de incluir HttpClientTestingModule aquí
        AdminComponent            // AdminComponent se debe importar aquí si es standalone
      ],
      providers: [
        { provide: ProductsService, useValue: mockProductService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el formulario con controles vacíos', () => {
    const form = component.productForm;
    expect(form).toBeTruthy();
    expect(form.controls.name.value).toBe('');
    expect(form.valid).toBeFalse();
  });

  it('debería marcar el campo "name" como inválido si está vacío', () => {
    const nameControl = component.productForm.controls.name;
    nameControl.setValue('');
    expect(nameControl.invalid).toBeTrue();
    expect(nameControl.errors?.['required']).toBeTrue();
  });

  it('debería llamar a productService.createProduct al enviar el formulario válido', () => {
    component.productForm.setValue({
      reference: '123',
      name: 'Producto de prueba',
      price: '100',
      description: 'Una descripción válida',
      check: true,
      type: 'ropa',
      img: ''
    });

    component.handleSubmit();

    expect(mockProductService.createProduct).toHaveBeenCalledWith({
      reference: 123,
      name: 'Producto de prueba',
      price: 100,
      description: 'Una descripción válida',
      check: true,
      type: 'ropa',
      img: ''
    });
  });
});
