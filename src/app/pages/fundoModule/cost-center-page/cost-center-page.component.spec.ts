import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCenterPageComponent } from './cost-center-page.component';

describe('CostCenterPageComponent', () => {
  let component: CostCenterPageComponent;
  let fixture: ComponentFixture<CostCenterPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCenterPageComponent]
    });
    fixture = TestBed.createComponent(CostCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
