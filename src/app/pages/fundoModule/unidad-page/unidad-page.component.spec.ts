import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadPageComponent } from './unidad-page.component';

describe('UnidadPageComponent', () => {
  let component: UnidadPageComponent;
  let fixture: ComponentFixture<UnidadPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadPageComponent]
    });
    fixture = TestBed.createComponent(UnidadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
