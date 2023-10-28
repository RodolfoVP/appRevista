import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterFormComponent } from './cost-center-form.component';

describe('CostCenterFormComponent', () => {
  let component: CostCenterFormComponent;
  let fixture: ComponentFixture<CostCenterFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterFormComponent]
    });
    fixture = TestBed.createComponent(CostCenterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
