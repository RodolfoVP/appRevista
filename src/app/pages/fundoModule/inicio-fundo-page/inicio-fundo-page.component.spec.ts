import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFundoPageComponent } from './inicio-fundo-page.component';

describe('InicioFundoPageComponent', () => {
  let component: InicioFundoPageComponent;
  let fixture: ComponentFixture<InicioFundoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioFundoPageComponent]
    });
    fixture = TestBed.createComponent(InicioFundoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
