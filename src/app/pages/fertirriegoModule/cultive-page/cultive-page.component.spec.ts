import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivePageComponent } from './cultive-page.component';

describe('CultivePageComponent', () => {
  let component: CultivePageComponent;
  let fixture: ComponentFixture<CultivePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultivePageComponent]
    });
    fixture = TestBed.createComponent(CultivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
