import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOtpFormComponent } from './verify-otp-form.component';

describe('VerifyOtpFormComponent', () => {
  let component: VerifyOtpFormComponent;
  let fixture: ComponentFixture<VerifyOtpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyOtpFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyOtpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
