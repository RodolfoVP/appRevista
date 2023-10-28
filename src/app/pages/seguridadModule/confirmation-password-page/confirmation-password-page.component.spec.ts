import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPasswordPageComponent } from './confirmation-password-page.component';

describe('ConfirmationPasswordPageComponent', () => {
  let component: ConfirmationPasswordPageComponent;
  let fixture: ComponentFixture<ConfirmationPasswordPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationPasswordPageComponent]
    });
    fixture = TestBed.createComponent(ConfirmationPasswordPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
