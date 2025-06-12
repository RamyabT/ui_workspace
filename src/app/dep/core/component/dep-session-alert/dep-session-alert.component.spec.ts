import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepSessionAlertComponent } from './dep-session-alert.component';

describe('DepSessionAlertComponent', () => {
  let component: DepSessionAlertComponent;
  let fixture: ComponentFixture<DepSessionAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepSessionAlertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepSessionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
