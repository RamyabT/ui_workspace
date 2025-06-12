import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnableBiometricFormComponent } from './enable-biometric-form.component';

describe('EnableBiometricFormComponent', () => {
  let component: EnableBiometricFormComponent;
  let fixture: ComponentFixture<EnableBiometricFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnableBiometricFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnableBiometricFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
