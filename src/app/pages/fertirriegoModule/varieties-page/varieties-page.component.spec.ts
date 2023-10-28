import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VarietiesPageComponent } from './varieties-page.component';

describe('VarietiesPageComponent', () => {
  let component: VarietiesPageComponent;
  let fixture: ComponentFixture<VarietiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VarietiesPageComponent]
    });
    fixture = TestBed.createComponent(VarietiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
