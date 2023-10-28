import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdListComponent } from './threshold-list.component';

describe('ThresholdListComponent', () => {
  let component: ThresholdListComponent;
  let fixture: ComponentFixture<ThresholdListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdListComponent]
    });
    fixture = TestBed.createComponent(ThresholdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
