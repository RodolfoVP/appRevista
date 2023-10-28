import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValveFormComponent } from './valve-form.component';

describe('ValveFormComponent', () => {
  let component: ValveFormComponent;
  let fixture: ComponentFixture<ValveFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValveFormComponent]
    });
    fixture = TestBed.createComponent(ValveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
