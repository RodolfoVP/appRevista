import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizerFormComponent } from './fertilizer-form.component';

describe('FertilizerFormComponent', () => {
  let component: FertilizerFormComponent;
  let fixture: ComponentFixture<FertilizerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FertilizerFormComponent]
    });
    fixture = TestBed.createComponent(FertilizerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
