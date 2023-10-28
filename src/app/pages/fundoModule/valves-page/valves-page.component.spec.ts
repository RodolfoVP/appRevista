import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValvesPageComponent } from './valves-page.component';

describe('ValvesPageComponent', () => {
  let component: ValvesPageComponent;
  let fixture: ComponentFixture<ValvesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValvesPageComponent]
    });
    fixture = TestBed.createComponent(ValvesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
