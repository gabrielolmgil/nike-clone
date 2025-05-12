import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule] // 👈 necesario para HttpClient
    });
    service = TestBed.inject(AuthService);
  });

  it('AuthService se ha instanciado sin errores', () => {
    expect(service).toBeTruthy();
  });
});
