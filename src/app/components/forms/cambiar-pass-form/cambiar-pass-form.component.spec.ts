import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarPassFormComponent } from './cambiar-pass-form.component';

describe('CambiarPassFormComponent', () => {
  let component: CambiarPassFormComponent;
  let fixture: ComponentFixture<CambiarPassFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CambiarPassFormComponent]
    });
    fixture = TestBed.createComponent(CambiarPassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
