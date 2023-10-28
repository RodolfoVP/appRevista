import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValvePageComponent } from './valve-page.component';

describe('ValvePageComponent', () => {
  let component: ValvePageComponent;
  let fixture: ComponentFixture<ValvePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValvePageComponent]
    });
    fixture = TestBed.createComponent(ValvePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
