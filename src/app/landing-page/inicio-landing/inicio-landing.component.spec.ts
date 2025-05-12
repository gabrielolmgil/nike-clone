import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioLandingComponent } from './inicio-landing.component';

describe('InicioLandingComponent', () => {
  let component: InicioLandingComponent;
  let fixture: ComponentFixture<InicioLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('InicioLandingComponent se crea correctamente', () => {
    expect(component).toBeTruthy();
  });
});
