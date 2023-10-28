import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizersPageComponent } from './fertilizers-page.component';

describe('FertilizersPageComponent', () => {
  let component: FertilizersPageComponent;
  let fixture: ComponentFixture<FertilizersPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FertilizersPageComponent]
    });
    fixture = TestBed.createComponent(FertilizersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
