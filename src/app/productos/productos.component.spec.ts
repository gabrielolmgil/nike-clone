import { TestBed } from '@angular/core/testing';
import { ProductsService } from '../services/products.service';  
import { HttpClientTestingModule } from '@angular/common/http/testing';  

describe('ProductsComponent', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ProductsService]  
    });
    service = TestBed.inject(ProductsService); 
  });

  it('Component ProductsComponent se crea correctamente', () => {
    expect(service).toBeTruthy();  
  });
});
