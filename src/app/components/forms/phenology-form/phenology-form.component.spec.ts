import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenologyFormComponent } from './phenology-form.component';

describe('PhenologyFormComponent', () => {
  let component: PhenologyFormComponent;
  let fixture: ComponentFixture<PhenologyFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhenologyFormComponent]
    });
    fixture = TestBed.createComponent(PhenologyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
