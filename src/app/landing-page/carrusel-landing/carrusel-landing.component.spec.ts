import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarruselLandingComponent } from './carrusel-landing.component';

describe('CarruselLandingComponent', () => {
  let component: CarruselLandingComponent;
  let fixture: ComponentFixture<CarruselLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarruselLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarruselLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
