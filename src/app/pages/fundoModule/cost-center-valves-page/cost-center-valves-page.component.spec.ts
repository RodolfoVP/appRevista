import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterValvesPageComponent } from './cost-center-valves-page.component';

describe('CostCenterValvesPageComponent', () => {
  let component: CostCenterValvesPageComponent;
  let fixture: ComponentFixture<CostCenterValvesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterValvesPageComponent]
    });
    fixture = TestBed.createComponent(CostCenterValvesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
