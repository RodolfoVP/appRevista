import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNutrientPhenologyComponent } from './dialog-nutrient-phenology.component';

describe('DialogNutrientPhenologyComponent', () => {
  let component: DialogNutrientPhenologyComponent;
  let fixture: ComponentFixture<DialogNutrientPhenologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNutrientPhenologyComponent]
    });
    fixture = TestBed.createComponent(DialogNutrientPhenologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
