import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogVarietyPhenologyComponent } from './dialog-variety-phenology.component';

describe('DialogVarietyPhenologyComponent', () => {
  let component: DialogVarietyPhenologyComponent;
  let fixture: ComponentFixture<DialogVarietyPhenologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogVarietyPhenologyComponent]
    });
    fixture = TestBed.createComponent(DialogVarietyPhenologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
