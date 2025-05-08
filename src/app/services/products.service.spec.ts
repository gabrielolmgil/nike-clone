import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';
import { Products } from '../interfaces/products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        { provide: Router, useValue: spy }
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send POST request to create product and navigate', () => {
    const mockProduct: Products = {
      reference: 123,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      check: true,
      type: 'ropa',
      img: 'test.jpg'
    };

    service.createProduct(mockProduct);

    const req = httpMock.expectOne('http://localhost:3000/api/setProduct');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      reference: 123,
      name: 'Test Product',
      price: 100,
      description: 'Test Description',
      check: true,
      type: 'ropa',
      img: 'test.jpg'
    });

    req.flush({}); // Simula respuesta

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/productos']);
  });
});
