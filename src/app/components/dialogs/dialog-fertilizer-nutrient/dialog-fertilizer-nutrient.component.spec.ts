import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFertilizerNutrientComponent } from './dialog-fertilizer-nutrient.component';

describe('DialogFertilizerNutrientComponent', () => {
  let component: DialogFertilizerNutrientComponent;
  let fixture: ComponentFixture<DialogFertilizerNutrientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFertilizerNutrientComponent]
    });
    fixture = TestBed.createComponent(DialogFertilizerNutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
