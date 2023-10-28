import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesPageComponent } from './unidades-page.component';

describe('UnidadesPageComponent', () => {
  let component: UnidadesPageComponent;
  let fixture: ComponentFixture<UnidadesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadesPageComponent]
    });
    fixture = TestBed.createComponent(UnidadesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
