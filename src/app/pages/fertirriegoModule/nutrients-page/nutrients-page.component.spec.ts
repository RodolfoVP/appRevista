import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutrientsPageComponent } from './nutrients-page.component';

describe('NutrientsPageComponent', () => {
  let component: NutrientsPageComponent;
  let fixture: ComponentFixture<NutrientsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutrientsPageComponent]
    });
    fixture = TestBed.createComponent(NutrientsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
