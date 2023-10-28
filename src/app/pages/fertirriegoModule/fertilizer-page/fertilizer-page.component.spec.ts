import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizerPageComponent } from './fertilizer-page.component';

describe('FertilizerPageComponent', () => {
  let component: FertilizerPageComponent;
  let fixture: ComponentFixture<FertilizerPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FertilizerPageComponent]
    });
    fixture = TestBed.createComponent(FertilizerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
