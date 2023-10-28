import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFertirriegoPageComponent } from './inicio-fertirriego-page.component';

describe('InicioFertirriegoPageComponent', () => {
  let component: InicioFertirriegoPageComponent;
  let fixture: ComponentFixture<InicioFertirriegoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioFertirriegoPageComponent]
    });
    fixture = TestBed.createComponent(InicioFertirriegoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
