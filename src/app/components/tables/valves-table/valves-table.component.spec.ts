import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValvesTableComponent } from './valves-table.component';

describe('ValvesTableComponent', () => {
  let component: ValvesTableComponent;
  let fixture: ComponentFixture<ValvesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValvesTableComponent]
    });
    fixture = TestBed.createComponent(ValvesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
