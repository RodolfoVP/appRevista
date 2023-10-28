import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhenologiesTableComponent } from './phenologies-table.component';

describe('PhenologiesTableComponent', () => {
  let component: PhenologiesTableComponent;
  let fixture: ComponentFixture<PhenologiesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhenologiesTableComponent]
    });
    fixture = TestBed.createComponent(PhenologiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
