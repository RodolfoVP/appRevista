import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCostCenterPhenologyComponent } from './dialog-cost-center-phenology.component';

describe('DialogCostCenterPhenologyComponent', () => {
  let component: DialogCostCenterPhenologyComponent;
  let fixture: ComponentFixture<DialogCostCenterPhenologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogCostCenterPhenologyComponent]
    });
    fixture = TestBed.createComponent(DialogCostCenterPhenologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
