import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenologiesPageComponent } from './phenologies-page.component';

describe('PhenologiesPageComponent', () => {
  let component: PhenologiesPageComponent;
  let fixture: ComponentFixture<PhenologiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhenologiesPageComponent]
    });
    fixture = TestBed.createComponent(PhenologiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
