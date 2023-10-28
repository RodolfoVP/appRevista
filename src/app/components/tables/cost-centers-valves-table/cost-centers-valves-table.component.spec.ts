import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentersValvesTableComponent } from './cost-centers-valves-table.component';

describe('CostCentersValvesTableComponent', () => {
  let component: CostCentersValvesTableComponent;
  let fixture: ComponentFixture<CostCentersValvesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCentersValvesTableComponent]
    });
    fixture = TestBed.createComponent(CostCentersValvesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
