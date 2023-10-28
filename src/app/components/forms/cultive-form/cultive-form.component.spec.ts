import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultiveFormComponent } from './cultive-form.component';

describe('CultiveFormComponent', () => {
  let component: CultiveFormComponent;
  let fixture: ComponentFixture<CultiveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultiveFormComponent]
    });
    fixture = TestBed.createComponent(CultiveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
