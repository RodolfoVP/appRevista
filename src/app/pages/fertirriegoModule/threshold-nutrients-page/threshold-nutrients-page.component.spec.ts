import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdNutrientsPageComponent } from './threshold-nutrients-page.component';

describe('ThresholdNutrientsPageComponent', () => {
  let component: ThresholdNutrientsPageComponent;
  let fixture: ComponentFixture<ThresholdNutrientsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdNutrientsPageComponent]
    });
    fixture = TestBed.createComponent(ThresholdNutrientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
