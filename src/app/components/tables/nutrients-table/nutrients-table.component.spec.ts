import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientsTableComponent } from './nutrients-table.component';

describe('NutrientsTableComponent', () => {
  let component: NutrientsTableComponent;
  let fixture: ComponentFixture<NutrientsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutrientsTableComponent]
    });
    fixture = TestBed.createComponent(NutrientsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
