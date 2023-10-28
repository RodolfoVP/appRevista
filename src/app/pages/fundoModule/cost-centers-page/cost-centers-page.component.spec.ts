import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostCentersPageComponent } from './cost-centers-page.component';

describe('CostCentersPageComponent', () => {
  let component: CostCentersPageComponent;
  let fixture: ComponentFixture<CostCentersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CostCentersPageComponent]
    });
    fixture = TestBed.createComponent(CostCentersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
