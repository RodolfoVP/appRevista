import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdsTableComponent } from './thresholds-table.component';

describe('ThresholdsTableComponent', () => {
  let component: ThresholdsTableComponent;
  let fixture: ComponentFixture<ThresholdsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdsTableComponent]
    });
    fixture = TestBed.createComponent(ThresholdsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
