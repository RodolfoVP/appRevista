import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietyPageComponent } from './variety-page.component';

describe('VarietyPageComponent', () => {
  let component: VarietyPageComponent;
  let fixture: ComponentFixture<VarietyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarietyPageComponent]
    });
    fixture = TestBed.createComponent(VarietyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
