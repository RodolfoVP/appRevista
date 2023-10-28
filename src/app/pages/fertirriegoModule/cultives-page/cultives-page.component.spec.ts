import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivesPageComponent } from './cultives-page.component';

describe('CultivesPageComponent', () => {
  let component: CultivesPageComponent;
  let fixture: ComponentFixture<CultivesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultivesPageComponent]
    });
    fixture = TestBed.createComponent(CultivesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
