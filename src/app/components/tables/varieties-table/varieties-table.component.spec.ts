import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietiesTableComponent } from './varieties-table.component';

describe('VarietiesTableComponent', () => {
  let component: VarietiesTableComponent;
  let fixture: ComponentFixture<VarietiesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarietiesTableComponent]
    });
    fixture = TestBed.createComponent(VarietiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
