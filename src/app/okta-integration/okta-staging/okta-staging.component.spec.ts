import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaStagingComponent } from './okta-staging.component';

describe('OktaStagingComponent', () => {
  let component: OktaStagingComponent;
  let fixture: ComponentFixture<OktaStagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OktaStagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OktaStagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
