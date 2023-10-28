import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizersTableComponent } from './fertilizers-table.component';

describe('FertilizersTableComponent', () => {
  let component: FertilizersTableComponent;
  let fixture: ComponentFixture<FertilizersTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FertilizersTableComponent]
    });
    fixture = TestBed.createComponent(FertilizersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
