import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenologyPageComponent } from './phenology-page.component';

describe('PhenologyPageComponent', () => {
  let component: PhenologyPageComponent;
  let fixture: ComponentFixture<PhenologyPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhenologyPageComponent]
    });
    fixture = TestBed.createComponent(PhenologyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
