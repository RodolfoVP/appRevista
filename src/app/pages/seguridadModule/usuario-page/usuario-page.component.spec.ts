import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPageComponent } from './usuario-page.component';

describe('UsuarioPageComponent', () => {
  let component: UsuarioPageComponent;
  let fixture: ComponentFixture<UsuarioPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioPageComponent]
    });
    fixture = TestBed.createComponent(UsuarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
