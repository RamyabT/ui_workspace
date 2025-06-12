import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpCancelFormComponent } from './otp-cancel-form.component';

describe('OtpCancelFormComponent', () => {
  let component: OtpCancelFormComponent;
  let fixture: ComponentFixture<OtpCancelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpCancelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpCancelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
