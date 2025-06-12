import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpinLoginFormComponent } from './mpin-login-form.component';

describe('MpinLoginFormComponent', () => {
  let component: MpinLoginFormComponent;
  let fixture: ComponentFixture<MpinLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpinLoginFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MpinLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
