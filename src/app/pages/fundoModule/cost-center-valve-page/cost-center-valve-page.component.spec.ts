import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterValvePageComponent } from './cost-center-valve-page.component';

describe('CostCenterValvePageComponent', () => {
  let component: CostCenterValvePageComponent;
  let fixture: ComponentFixture<CostCenterValvePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterValvePageComponent]
    });
    fixture = TestBed.createComponent(CostCenterValvePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
