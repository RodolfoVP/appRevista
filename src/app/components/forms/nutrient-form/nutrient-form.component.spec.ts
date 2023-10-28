import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientFormComponent } from './nutrient-form.component';

describe('NutrientFormComponent', () => {
  let component: NutrientFormComponent;
  let fixture: ComponentFixture<NutrientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutrientFormComponent]
    });
    fixture = TestBed.createComponent(NutrientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
