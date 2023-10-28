import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CultivesTableComponent } from './cultives-table.component';

describe('CultivesTableComponent', () => {
  let component: CultivesTableComponent;
  let fixture: ComponentFixture<CultivesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CultivesTableComponent]
    });
    fixture = TestBed.createComponent(CultivesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
