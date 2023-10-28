import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterValveFormComponent } from './cost-center-valve-form.component';

describe('CostCenterValveFormComponent', () => {
  let component: CostCenterValveFormComponent;
  let fixture: ComponentFixture<CostCenterValveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterValveFormComponent]
    });
    fixture = TestBed.createComponent(CostCenterValveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
