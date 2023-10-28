import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigGeneralFertirriegoComponent } from './config-general-fertirriego.component';

describe('ConfigGeneralFertirriegoComponent', () => {
  let component: ConfigGeneralFertirriegoComponent;
  let fixture: ComponentFixture<ConfigGeneralFertirriegoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigGeneralFertirriegoComponent]
    });
    fixture = TestBed.createComponent(ConfigGeneralFertirriegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
