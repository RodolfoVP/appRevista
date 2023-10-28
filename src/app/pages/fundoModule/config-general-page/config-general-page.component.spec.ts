import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGeneralPageComponent } from './config-general-page.component';

describe('ConfigGeneralPageComponent', () => {
  let component: ConfigGeneralPageComponent;
  let fixture: ComponentFixture<ConfigGeneralPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigGeneralPageComponent]
    });
    fixture = TestBed.createComponent(ConfigGeneralPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
