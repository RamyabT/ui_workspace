import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordControlComponent } from './change-password-control.component';

describe('ChangePasswordControlComponent', () => {
  let component: ChangePasswordControlComponent;
  let fixture: ComponentFixture<ChangePasswordControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
