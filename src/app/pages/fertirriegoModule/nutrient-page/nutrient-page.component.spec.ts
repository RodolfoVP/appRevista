import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientPageComponent } from './nutrient-page.component';

describe('NutrientPageComponent', () => {
  let component: NutrientPageComponent;
  let fixture: ComponentFixture<NutrientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutrientPageComponent]
    });
    fixture = TestBed.createComponent(NutrientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
