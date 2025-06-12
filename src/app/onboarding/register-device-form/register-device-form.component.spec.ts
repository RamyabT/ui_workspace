import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDeviceFormComponent } from './register-device-form.component';

describe('RegisterDeviceFormComponent', () => {
  let component: RegisterDeviceFormComponent;
  let fixture: ComponentFixture<RegisterDeviceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDeviceFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDeviceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
