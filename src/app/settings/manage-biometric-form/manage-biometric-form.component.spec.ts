import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBiometricFormComponent } from './manage-biometric-form.component';

describe('ManageBiometricFormComponent', () => {
  let component: ManageBiometricFormComponent;
  let fixture: ComponentFixture<ManageBiometricFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBiometricFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBiometricFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
