import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdsPageComponent } from './thresholds-page.component';

describe('ThresholdsPageComponent', () => {
  let component: ThresholdsPageComponent;
  let fixture: ComponentFixture<ThresholdsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThresholdsPageComponent]
    });
    fixture = TestBed.createComponent(ThresholdsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
