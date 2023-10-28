import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCountPageComponent } from './my-count-page.component';

describe('MyCountPageComponent', () => {
  let component: MyCountPageComponent;
  let fixture: ComponentFixture<MyCountPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCountPageComponent]
    });
    fixture = TestBed.createComponent(MyCountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
