import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsPageComponent } from './campaigns-page.component';

describe('CampaignsPageComponent', () => {
  let component: CampaignsPageComponent;
  let fixture: ComponentFixture<CampaignsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignsPageComponent]
    });
    fixture = TestBed.createComponent(CampaignsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
