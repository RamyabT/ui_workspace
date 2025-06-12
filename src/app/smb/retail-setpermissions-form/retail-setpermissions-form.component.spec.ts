import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailSetpermissionsFormComponent } from './retail-setpermissions-form.component';

describe('RetailSetpermissionsFormComponent', () => {
  let component: RetailSetpermissionsFormComponent;
  let fixture: ComponentFixture<RetailSetpermissionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetailSetpermissionsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetailSetpermissionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
